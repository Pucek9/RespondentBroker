import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './usersTab.html';
import {interpolatedValue} from '../../../helpers/helpers';

class UsersTab {
	constructor($scope, $reactive, $interpolate) {
		'ngInject';
		$reactive(this).attach($scope);

		this.pageTitle = 'Users';
		this.icon = 'users';
		this.color = 'yellow';

		this.helpers({

			users() {
				// let usr = Meteor.users.find({}).fetch();
				return Meteor.users.find({})

			}
		});

		this.columns = [
			{
				field: 'profile',
				show: true,
				title: 'Name',
				sortable: 'profile.name',
				filter: {'profile.name': 'text'},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="users/{{row._id}}/details">{{row.profile.name}}</a>`)
			},
			{
				field: "profile",
				show: true,
				title: "Forname",
				sortable: 'profile.forName',
				filter: {'profile.forName': "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.forName}}`)
			},
			{
				field: "emails",
				show: true,
				title: "Email",
				sortable: "profile.email",
				filter: {'profile.email': "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.email}}`)
			},
			{
				field: "profile",
				filter: {'profile.level': "number"},
				show: true,
				sortable: "profile.level",
				title: "Level",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.level}}`)
			},
			{
				field: "profile", filter: {'profile.points': "number"}, show: true, sortable: "profile.points", title: "Points",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.points}}`)
			},

		];
	}


}

const name = 'usersTab';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: UsersTab
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('users', {
			url: '/users',
			template: '<users-tab></users-tab>'
		});
}