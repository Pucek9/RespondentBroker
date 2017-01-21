import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import {PROJECT_DETAILS as PAGE} from '../../../helpers/constants';
import template from './projectDetails.html';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $interpolate) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

		this.getCurrentProject = () => {
			return Projects.findOne({_id: this.projectId});
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
				let statisticsArray = {
					birthDate: [], language: [], education: []
				};
				users.forEach(u => {
					statisticsArray.birthDate.push(u.profile.birthDate);
					statisticsArray.language.push(u.profile.language);
					statisticsArray.education.push(u.profile.education);
				});
				const statistics = {};
				[statistics.birthDate, statistics.language, statistics.education] = Object.values(statisticsArray).map(s => this.convertToStats(s));
				console.log(Object.values(statistics.education));
				console.log(Object.keys(statistics.education));
				return statistics;
			}
		});

		this.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
		this.data = [300, 500, 100];

	}

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
	}

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
	}
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