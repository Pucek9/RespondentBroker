import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './userPanel.html';

class UserPanel {

	constructor() {
		this.name = 'Michał';
	}

}
const name = 'userPanel';

export default angular.module(name, [
	angularMeteor,

]).component(name, {
	template,
	controllerAs: name,
	controller: UserPanel
})
