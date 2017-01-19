import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {ABOUT as PAGE} from '../../../helpers/constants';
import template from './about.html';

class Controller {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle,this.icon,this.color] = [PAGE.pageTitle, PAGE.icon, PAGE.color];
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