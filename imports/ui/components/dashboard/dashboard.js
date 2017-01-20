import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {DASHBOARD as PAGE} from '../../../helpers/constants';
import template from './dashboard.html';

class Controller {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle,this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.userId = Meteor.userId();

		this.helpers({
			users() {
				return Meteor.users.find({});
			},
			projects() {
				return Projects.find({owner: this.userId});
			},
			responses() {
				return Responses.find({});
			},
			points() {
				let users = Meteor.users.find({});
				var sum=0;
				users.forEach(function(user){
					sum = sum + user.profile.points;
				});
				return sum;
			},
		});
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
			template: PAGE.template
		});
}