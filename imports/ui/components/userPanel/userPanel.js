import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import template from './userPanel.html';


class UserPanel {

	constructor($scope, $reactive,$timeout) {
		'ngInject';
		$reactive(this).attach($scope);


		this.helpers({

			user() {
				return Meteor.user()
			}
		});
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
