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
	constructor($stateParams, $scope, $reactive, $state, $interpolate,$filter) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$filter = $filter;
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "_id",
				show: true,
				title: "Actions",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/responses/{{row._id}}">{{'VIEW' | translate}}</a>`),
			},
			{
				field: "ownerName",
				show: true,
				title: "Presented",
				sortable: "ownerName",
				filter: {ownerName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="users/{{row.owner}}/details">{{row.ownerName}}</a>`),
			},
			{
				field: "steps",
				show: true,
				title: "Steps",
				sortable: "steps.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.steps.length}}`)
			},
			{field: "isPaid", filter: {isPaid: "text"}, show: true, sortable: "isPaid", title: "Is paid"},
		];

		this.tooltips = {
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
		this.legend = {display: true, position: 'bottom',	padding: 5};
		
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
			responses() {
				let responses = Responses.find({project: this.projectId}).fetch();
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
					statistics.language.push(this.$filter('translate')(u.profile.language));
					let education = 'USER.'+ u.profile.education.toUpperCase();
					statistics.education.push(this.$filter('translate')(education));
					let gender = 'USER.'+ u.profile.gender.toUpperCase();
					statistics.gender.push(this.$filter('translate')(gender));
				});
				[statistics.age, statistics.language, statistics.education, statistics.gender] = Object.values(statistics).map(this.convertToObject);
				console.log(statistics);
				return statistics;
			}
		});

	}

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

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
]).component(PAGE.name, {
	template,
	controller: Controller
})
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