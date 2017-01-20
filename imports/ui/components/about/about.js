import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {ABOUT as PAGE} from '../../../helpers/constants';
import template from './about.html';
import {Meteor} from 'meteor/meteor';
class Controller {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle,this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.helpers({
			users() {
				return Meteor.users.find({});
			}
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