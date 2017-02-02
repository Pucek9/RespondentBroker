import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import {getAge} from '../../../helpers/helpers';
import {getAgeRange} from '../../../helpers/helpers';
import {PROJECT_DETAILS as PAGE} from '../../../helpers/constants';
import template from './projectDetails.html';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $interpolate, $filter, $window, FileSaver, Blob, stats) {
		'ngInject';
		$reactive(this).attach($scope);
		this.translate = $filter('translate');
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.stats = stats;
		this.FileSaver = FileSaver;
		this.Blob = Blob;
		this.bigScreen = $window.innerWidth >= 768;
		this.screen = {width: $window.innerWidth, height: $window.innerHeight};
		this.actions = true;
		this.mistakes = false;
		this.times = false;
		this.faultyTimes = false;
		this.partFaultyTimes = false;

		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "_id",
				show: true,
				title: this.translate('ACTIONS'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<span class="oneline link"><a href="projects/{{row.project}}/responses/{{row._id}}"><i class="fa fa-eye text-asphalt" aria-hidden="true"></i> {{'PREVIEW' | translate }}</a></span><br/>`),
			},
			{
				field: "ownerName",
				show: true,
				title: this.translate('PRESENTED'),
				sortable: "ownerName",
				filter: {ownerName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<span class="link"><a href="users/{{row.owner}}/details">{{row.ownerName}}</a></span>`),
			},
			{
				field: "steps",
				show: true,
				title: this.translate('STEPS'),
				sortable: "steps.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.steps.length}}`)
			},
			{
				field: "isPaid",
				filter: {isPaid: "text"},
				show: true,
				sortable: "isPaid",
				title: this.translate('PROJECT.IS_PAID'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.isPaid | translate}}`),
			},
		];

		this.tooltipsPie = {
			callbacks: {
				label: function (tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
						return previousValue + currentValue;
					});
					let currentValue = dataset.data[tooltipItem.index];
					let precentage = Math.floor(((currentValue / total) * 100) + 0.5);
					return `${data.labels[tooltipItem.index]}: ${currentValue.toFixed(2)} (${precentage}%)`;
				}
			}
		};

		this.tooltipsBarStatics = {
			callbacks: {
				label: function (tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let currentValue = dataset.data[tooltipItem.index];
					return `${dataset.label}: ${currentValue.toFixed(2)}`;
				}
			}
		};

		this.tooltipsBar = {
			callbacks: {
				label: function (tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let currentValue = dataset.data[tooltipItem.index];
					return currentValue.toFixed(2).toString();
				}
			}
		};

		this.tooltipsBarPercentage = {
			callbacks: {
				label: function (tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let currentValue = dataset.data[tooltipItem.index];
					return `${currentValue.toFixed(2)}%`;
				}
			}
		};

		this.legend = {display: true, position: 'bottom', padding: 5};

		this.scales = {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		};

		this.helpers({
			project() {
				return this.getCurrentProject();
			},
			isMyProject() {
				let project = this.getCurrentProject();
				if (project) {
					return Meteor.userId() === project.owner;
				}
			},
			backState() {
				let project = this.getCurrentProject();
				if (project) {
					if (Meteor.userId() === project.owner) {
						return 'projects/my';
					}
					else if (!project.statusActive) {
						return 'projects/archive';
					}
					else {
						return 'projects';
					}
				}
			},
			responsesTab() {
				let responses = this.getResponses().fetch();
				if (responses) {
					let users = Meteor.users.find({});
					responses.forEach((r, index, responsesArray) => {
						users.forEach((u) => {
							if (r.owner === u._id) {
								responsesArray[index].ownerName = u.profile.name + ' ' + u.profile.forName;
							}
						});
					});
					return responses;
				}
			},
			allUserPaid() {
				let responses = this.getResponses().fetch();
				if (responses) {
					let unpaid = responses.filter(r => r.isPaid === false);
					return unpaid.length === 0;
				}
			},
			usersData() {
				let users = this.getUsers();
				let statistics = {
					age: [], language: [], education: [], gender: [], frequencyUseMobileApp: [], howLongUseMobileApp: []
				};
				if (users) {
					users.forEach(u => {
						statistics.age.push(getAgeRange(u.profile.birthDate));

						statistics.language.push(this.translate(u.profile.language));

						let education = 'USER.' + u.profile.education.toUpperCase();
						statistics.education.push(this.translate(education));

						let gender = 'USER.' + u.profile.gender.toUpperCase();
						statistics.gender.push(this.translate(gender));

						let frequencyUseMobileApp = u.profile.frequencyUseMobileApp;
						statistics.frequencyUseMobileApp.push(this.translate(frequencyUseMobileApp));

						statistics.howLongUseMobileApp.push(u.profile.howLongUseMobileApp);
					});
					[statistics.age, statistics.language, statistics.education, statistics.gender, statistics.frequencyUseMobileApp, statistics.howLongUseMobileApp] = Object.values(statistics).map(this.convertToObject);
					// console.log(statistics);
					return statistics;
				}
			},
			data() {
				return this.getData()
			}
		});
	}

	downloadJSON = () => {
		let statistics = JSON.stringify(this.getData());
		let data = new this.Blob([statistics], {type: 'text/json;charset=charset=utf-8'});
		this.FileSaver.saveAs(data, this.project.name + 'Stats.json');
	};

	getData() {
		let project = this.getCurrentProject();
		let responses = Responses.find({project: this.projectId, isPaid: true});
		if (project && responses) {
			let data = {
				names: project.tasks.map(task => task.name),
				series: [
					this.translate('MEDIAN'),
					this.translate('AVERAGE'),
					this.translate('VARIANCE'),
					this.translate('STANDARD_DEVIATION'),
					this.translate('MIN'),
					this.translate('MAX'),
				],
				dataSeries: [],
				stars: [],
				starsAll: [],
				actions: [],
				actionsAll: [],
				mistakes: [],
				mistakesAll: [],
				times: [],
				timesAll: [],
				faultyTimes: [],
				faultyTimesAll: [],
				partFaultyTimes: [],
				partFaultyTimesAll: [],
				completed: [],
				completedAll: []

			};
			responses.forEach(response => {
				data.dataSeries.push(response._id);
				data.stars.push(
					response.steps.map(step => step.stars),
				);
				data.starsAll.push(
					...response.steps.map(step => step.stars),
				);
				data.actions.push(
					response.steps.map(step => step.actions.filter(a => a.type === 'action' || a.type === 'finishFaultyPath').length)
				);
				data.actionsAll.push(
					...response.steps.map(step => step.actions.filter(a => a.type === 'action' || a.type === 'finishFaultyPath').length)
				);
				data.mistakes.push(
					response.steps.map(step => step.actions.filter(a => a.type === 'wrongAction' || a.type === 'beginFaultyPath').length)
				);
				data.mistakesAll.push(
					...response.steps.map(step => step.actions.filter(a => a.type === 'wrongAction' || a.type === 'beginFaultyPath').length)
				);
				data.times.push(
					response.steps.map(step => this.getTimeFromAction(step.actions))
				);
				data.timesAll.push(
					...response.steps.map(step => this.getTimeFromAction(step.actions))
				);
				data.faultyTimes.push(
					response.steps.map(step => this.getFaultyTimesFromAction(step.actions))
				);
				data.faultyTimesAll.push(
					...response.steps.map(step => this.getFaultyTimesFromAction(step.actions))
				);
				data.partFaultyTimes.push(
					response.steps.map(step => {
						let faultyTime = this.getFaultyTimesFromAction(step.actions);
						let totalTime = this.getTimeFromAction(step.actions);
						return faultyTime * 100 / totalTime;
					})
				);
				data.partFaultyTimesAll.push(
					...response.steps.map(step => {
						let faultyTime = this.getFaultyTimesFromAction(step.actions);
						let totalTime = this.getTimeFromAction(step.actions);
						return faultyTime * 100 / totalTime;
					})
				);
				data.completedAll.push(
					...response.steps.map(step => this.translate(step.isComplete)),
				);
				data.completed.push(
					response.steps.map(step => Number(step.isComplete)),
				);
			});
			data.starsStatsAll = this.allStats(data.starsAll);
			data.starsAll = this.convertToObject(data.starsAll);
			data.mistakesRespondents = this.getPercentage(data.mistakes);
			data.completedAll = this.convertToObject(data.completedAll);
			data.completedTranspoted = this.stats.transpose(data.completed).map(this.getBinaryPercentage);

			data.starsStats = this.transposeToStats(data.stars);
			data.actionsStats = this.transposeToStats(data.actions);
			data.mistakesStats = this.transposeToStats(data.mistakes);
			data.mistakesRespondentsStats = this.transposeToStats(data.mistakesRespondents);
			data.timesStats = this.transposeToStats(data.times);
			data.faultyTimesStats = this.transposeToStats(data.faultyTimes);
			data.partFaultyTimesStats = this.transposeToStats(data.partFaultyTimes);

			data.actionsStatsAll = this.allStats(data.actionsAll);
			data.mistakesStatsAll = this.allStats(data.mistakesAll);
			data.timesStatsAll = this.allStats(data.timesAll);
			data.faultyTimesStatsAll = this.allStats(data.faultyTimesAll);
			data.partFaultyTimesStatsAll = this.allStats(data.partFaultyTimesAll);
			return data;
		}
	};

	chooseTab(tab) {
		this.actions = false;
		this.mistakes = false;
		this.times = false;
		this.faultyTimes = false;
		this.partFaultyTimes = false;
		this[tab] = true;
	}

	averageMap = (array => this.stats.average(array));

	getPercentage(arrays) {
		const stats = [];
		const transposed = this.stats.transpose(arrays);

		transposed.forEach(array => {
			let total = array.length;
			stats.push([
				array.filter(element => element === 0).length / total * 100
			])
		});
		return this.stats.transpose(stats);
	}

	allStats = (array) => {
		return [
			this.stats.median(array),
			this.stats.average(array),
			this.stats.variance(array),
			this.stats.standardDeviation(array),
			this.stats.min(array),
			this.stats.max(array)
		]
	};

	transposeToStats = (arrays) => {
		const stats = [];
		const transposed = this.stats.transpose(arrays);
		transposed.forEach(a => {
			stats.push(this.allStats(a));
		});
		return this.stats.transpose(stats);
	};

	getBinaryPercentage = (array) => {
		let length = array.length;
		let sum = array.reduce((a, b) => a + b, 0);
		return sum / length * 100;
	};

	getTimeFromAction = (actions) => {
		let start = actions.find(a => a.type === 'start');
		let end = actions.find(a => a.type === 'end');
		return end.time - start.time;
	};

	getFaultyTimesFromAction = (actions) => {
		let start = actions.filter(a => a.type === 'beginFaultyPath');
		let end = actions.filter(a => a.type === 'finishFaultyPath');
		if (start.length === end.length) {
			let times = [];
			for (let i = 0; i < end.length; i++) {
				times.push(end[i].time - start[i].time)
			}
			return times.reduce((a, b) => a + b, 0);
		}
	};

	getResponses = () => {
		return Responses.find({project: this.projectId});
	};

	getCurrentProject = () => {
		return Projects.findOne({_id: this.projectId});
	};

	getUsers = () => {
		let responses = Responses.find({project: this.projectId, isPaid: true});
		let users = new Set();
		if (responses) {
			let allUsers = Meteor.users.find({}).fetch();
			if (allUsers) {
				responses.forEach((r) => {
					allUsers.forEach((u) => {
						if (r.owner === u._id) {
							users.add(u);
						}
					});
				});
				return ([...users]);
			}
		}
	};

	convertToObject = (s) => {
		let convertedData = this.convertToStats(s);
		s = {};
		[s.keys, s.values] = [Object.keys(convertedData), Object.values(convertedData)];
		return s;
	};

	convertToStats = (array) => {
		let obj = {};
		for (let i = 0, j = array.length; i < j; i++) {
			if (obj[array[i]]) {
				obj[array[i]]++;
			}
			else {
				obj[array[i]] = 1;
			}
		}
		return obj;
	};


}

export default angular
	.module(PAGE.name, [
		angularMeteor,
		uiRouter,
	]).component(PAGE.name, {
			template,
			controller: Controller
		}
	)
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider
		.state(PAGE.name, {
			url: PAGE.url,
			template: PAGE.template,
			resolve: {
				currentUser($q) {
					if (Meteor.userId() === null) {
						return $q.reject('AUTH_REQUIRED');
					} else {
						return $q.resolve();
					}
				}
			}
		});
}