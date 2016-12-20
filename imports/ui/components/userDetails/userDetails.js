import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './userDetails.html';

// import {Responses} from '../../../api/responses';
// import {name as DynamicTable} from '../dynamicTable/dynamicTable';
// import {interpolatedValue} from '../../../helpers/helpers';
// import actionsTemplate from './actions.html';

class UserDetails {
	constructor($stateParams, $scope, $reactive, $state, notification) {

		'ngInject';
		$reactive(this).attach($scope);
		this.userId = $stateParams.userId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Account Details ';
		this.icon = 'account';
		this.color = 'yellow';

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name"},
			{field: "responses", filter: {responses: "text"}, show: true, sortable: "responses", title: "Responses"},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Creatd"},
			{field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			{field: "owner", filter: {owner: "text"}, show: true, sortable: "owner", title: "Owner"},
			// {
			// 	field: "_id",
			// 	show: true,
			// 	title: "Actions",
			// 	getValue: interpolatedValue,
			// 	interpolateExpr: $interpolate(actionsTemplate)
			// }
		];

		this.helpers({
			user() {
				return Meteor.users.findOne({
					_id: this.userId
				});
			}
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