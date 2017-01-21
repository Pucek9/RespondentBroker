import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {USER_DETAILS as PAGE} from '../../../helpers/constants';
import template from './userDetails.html';

import {Responses} from '../../../api/responses';
import {Projects} from '../../../api/projects';

import {interpolatedValue} from '../../../helpers/helpers';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $interpolate, $filter, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.userId = $stateParams.userId;
		this.$state = $state;
		this.notification = notification;
		this.translate = $filter('translate');
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "projectName",
				show: true,
				title: this.translate('PROJECT.NAME'),
				sortable: "projectName",
				filter: {projectName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/details">{{row.projectName}}</a>`),
			},
			{
				field: "minPoints",
				show: true,
				title: "Points",
				sortable: "minPoints",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.minPoints}}-{{row.maxPoints}}`)
			},
			{field: "isPaid", filter: {isPaid: "text"}, show: true, sortable: "isPaid", title: this.translate('PROJECT.IS_PAID')},
			// {field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Creatd"},
			// {field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			// {field: "owner", filter: {owner: "text"}, show: true, sortable: "owner", title: "Owner"},
			{
				field: "steps",
				show: true,
				title: this.translate('STEPS'),
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
								responsesArray[index].maxPoints = p.maxPoints;
								responsesArray[index].minPoints = p.minPoints;
							}
						});
					});
					return responses;
				}
			},
		});
	}
}

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter
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