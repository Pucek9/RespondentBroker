import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'

import template from './userPanel.html';


class UserPanel {

	constructor($scope, $reactive, $rootScope, $timeout) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;

		this.guestAvatar = 'http://www.w3schools.com/w3images/avatar1.png';

		this.helpers({
			user() {
				return Meteor.user()
			},
			email() {
				// return Meteor.user().emails[0].address;
			}
		});

		Accounts.onLogin(() => {
			this.setDisplayNameToEmail();
		});

	}

	setDisplayNameToEmail() {
		this.$timeout(() => {
			// this.email = this.$rootScope.currentUser.emails[0].address;
			// this.display = angular.element(document).find('#login-name-link');
			// if(this.$rootScope.loggingIn) {
			// 	this.display.text(this.email + ' ▾');
			// }
		}, 1000);
	}

	$onInit() {
		if(this.$rootScope.loggingIn) {
			this.setDisplayNameToEmail();
		}

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
