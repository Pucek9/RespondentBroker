import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './userDetails.html';

import {Responses} from '../../../api/responses';
import {Projects} from '../../../api/projects';

import {interpolatedValue} from '../../../helpers/helpers';

class UserDetails {
	constructor($stateParams, $scope, $reactive, $state, $interpolate, notification) {

		'ngInject';
		$reactive(this).attach($scope);
		this.userId = $stateParams.userId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Account Details ';
		this.icon = 'user-circle-o';
		this.color = 'yellow';

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "projectName",
				show: true,
				title: "Project Name",
				sortable: "projectName",
				filter: {projectName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/details">{{row.projectName}}</a>`),
			},
			{field: "points", filter: {points: "number"}, show: true, sortable: "points", title: "Points"},
			{field: "isPaid", filter: {isPaid: "text"}, show: true, sortable: "isPaid", title: "Is paid"},
			// {field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Creatd"},
			// {field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			// {field: "owner", filter: {owner: "text"}, show: true, sortable: "owner", title: "Owner"},
			{
				field: "steps",
				show: true,
				title: "Steps",
				sortable: "steps.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.steps.length}}`)
			}
		];

		this.helpers({
			user() {
				return Meteor.users.findOne({
					_id: this.userId
				});
			},
			responses() {
				let responses = Responses.find({'owner': this.userId}).fetch();
				if (responses) {
					let projects = Projects.find({});
					responses.forEach((r, index, responsesArray) => {
						projects.forEach((p) => {
							if (r.project === p._id) {
								responsesArray[index].projectName = p.name;
								responsesArray[index].points = p.points;
							}
						});
					});
					return responses;
				}
			},
		});
	}
}

const name = 'userDetails';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: UserDetails
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('userDetails', {
		url: '/users/:userId/details',
		template: '<user-Details></user-Details>',
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