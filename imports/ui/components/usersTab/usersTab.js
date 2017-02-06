import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {USERS as PAGE} from '../../../helpers/constants';
import template from './usersTab.html';
import {interpolatedValue} from '../../../helpers/helpers';

class Controller {
	constructor($scope, $reactive, $interpolate,$filter) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.translate = $filter('translate');
		this.helpers({
			users() {
				return Meteor.users.find({},{sort: {'profile.name': 1}})
			}
		});

		this.columns = [
			{
				field: 'profile',
				show: true,
				title: this.translate('USER.NAME'),
				sortable: 'profile.name',
				filter: {'profile.name': 'text'},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="users/{{row._id}}/details">{{row.profile.name}}</a>`)
			},
			{
				field: "profile",
				show: true,
				title: this.translate('USER.FORNAME'),
				sortable: 'profile.forName',
				filter: {'profile.forName': "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.forName}}`)
			},
			{
				field: "emails",
				show: true,
				title: this.translate('EMAIL'),
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
				title: this.translate('LEVEL'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.level}}`)
			},
			{
				field: "profile", filter: {'profile.points': "number"}, show: true, sortable: "profile.points", title: this.translate('POINTS'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.profile.points}}`)
			},
		];
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
		});
}