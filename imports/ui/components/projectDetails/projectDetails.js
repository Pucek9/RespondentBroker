import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import {getAge} from '../../../helpers/helpers';

import {PROJECT_DETAILS as PAGE} from '../../../helpers/constants';
import template from './projectDetails.html';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $interpolate, $filter, stats) {
		'ngInject';
		$reactive(this).attach($scope);
		this.translate = $filter('translate');
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.stats = stats;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "_id",
				show: true,
				title: this.translate('ACTIONS'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/responses/{{row._id}}">{{'VIEW' | translate}}</a>`),
			},
			{
				field: "ownerName",
				show: true,
				title: this.translate('PRESENTED'),
				sortable: "ownerName",
				filter: {ownerName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="users/{{row.owner}}/details">{{row.ownerName}}</a>`),
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
				title: this.translate('PROJECT.IS_PAID')
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
					return `${data.labels[tooltipItem.index]}: ${currentValue} (${precentage}%)`;
				}
			}
		};

		this.tooltipsBar = {
			callbacks: {
				label: function (tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let currentValue = dataset.data[tooltipItem.index];
					return currentValue.toFixed(4).toString();
				}
			}
		};

		this.legend = {display: true, position: 'bottom', padding: 5};

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
			usersData() {
				let users = this.getUsers();
				let statistics = {
					age: [], language: [], education: [], gender: []
				};
				users.forEach(u => {
					statistics.age.push(getAge(u.profile.birthDate));
					statistics.language.push(this.translate(u.profile.language));
					let education = 'USER.' + u.profile.education.toUpperCase();
					statistics.education.push(this.translate(education));
					let gender = 'USER.' + u.profile.gender.toUpperCase();
					statistics.gender.push(this.translate(gender));
				});
				[statistics.age, statistics.language, statistics.education, statistics.gender] = Object.values(statistics).map(this.convertToObject);
				// console.log(statistics);
				return statistics;
			},
			data() {
				return this.getData()
			}
		});
	}

	getData() {
		let project = this.getCurrentProject();
		let responses = Responses.find({project: this.projectId});
		if (project && responses) {
			let data = {
				names: project.tasks.map(task => task.name),
				series: [this.translate('MEDIAN'), this.translate('AVERAGE'), this.translate('VARIANCE'), this.translate('STANDARD_DEVIATION')],
				stars: [],
				actions: [],
				mistakes: [],
				times: [],
				faultyTimes: []
			};
			responses.forEach(response => {
				// statistics.series.push(response._id);
				data.stars.push(
					response.steps.map(step => step.stars),
				);
				data.actions.push(
					response.steps.map(step => step.actions.filter(a => a.type === 'action').length)
				);
				data.mistakes.push(
					response.steps.map(step => step.actions.filter(a => a.type === 'wrongAction').length)
				);
				data.times.push(
					response.steps.map(step => this.getTimeFromAction(step.actions))
				);
				data.faultyTimes.push(
					response.steps.map(step => this.getFaultyTimesFromAction(step.actions))
				)
			});
			data.starsStats = this.transposeToStats(data.stars);
			data.actionsStats = this.transposeToStats(data.actions);
			data.mistakesStats = this.transposeToStats(data.mistakes);
			data.timesStats = this.transposeToStats(data.times);
			data.faultyTimesStats = this.transposeToStats(data.faultyTimes);
			return data;
		}
	};

	transposeToStats = (arrays) => {
		const stats = [];
		const transposed = this.stats.transpose(arrays);
		transposed.forEach(a => {
			stats.push([
				this.stats.median(a),
				this.stats.average(a),
				this.stats.variance(a),
				this.stats.standardDeviation(a)
			])
		});
		return this.stats.transpose(stats);
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
		let responses = Responses.find({project: this.projectId});
		let users = new Set();
		if (responses) {
			let allUsers = Meteor.users.find({}).fetch();
			responses.forEach((r) => {
				allUsers.forEach((u) => {
					if (r.owner === u._id) {
						users.add(u);
					}
				});
			});
			return ([...users]);
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