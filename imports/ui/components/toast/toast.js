import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './toast.html';

class Toast {

	constructor($scope, $reactive, text) {
		'ngInject';
		// $reactive(this).attach($scope);
		this.text = text;

	}
}

const name = 'toast';

export default angular.module(name, [
	angularMeteor,
]).component(name, {
	template,
	controllerAs: name,
	controller: Toast,
	bindToController: true
	// bindings: {
	// 	'columns': '=',
	// 	'data': '=',
	// 	'params': '='
	// },
})
