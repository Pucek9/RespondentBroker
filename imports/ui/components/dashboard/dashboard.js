import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './dashboard.html';

class Dashboard {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);

		this.pageTitle = 'Dashboard';
		this.icon = 'dashboard';

	}
}

const name = 'dashboard';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,

]).component(name, {
	template,
	controllerAs: name,
	controller: Dashboard
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			template: '<dashboard></dashboard>'
		});
}