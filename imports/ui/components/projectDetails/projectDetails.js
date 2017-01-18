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
		[this.pageTitle, this.icon, this.color] = [PAGE.pageTitle, PAGE.icon, PAGE.color];

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
					if(Meteor.userId() === project.owner) {
						return 'projects/my';
					}
					else if (!project.statusActive) {
						return 'archive';
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
			ownerFullname() {

			},
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "_id",
				show: true,
				title: "Actions",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/responses/{{row._id}}">View</a>`),
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

}

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
]).component(PAGE.name, {
	template,
	controllerAs: PAGE.name,
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