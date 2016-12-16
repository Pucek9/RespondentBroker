import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './actions.html';

class Actions {
	constructor($scope,$reactive) {
		'ngInject';
		$reactive(this).attach($scope);
	}
}

const name = 'actions';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings: {
		section: '<',
		id: '<'
	},
	controllerAs: name,
	controller: Actions
});