import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './userPanel.html';


class UserPanel {

	constructor($scope, $reactive, $timeout) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$timeout = $timeout;

		this.guestAvatar = '/images/avatar1.png';

		this.helpers({
			user() {
				return Meteor.user()
			},
			email() {
				let user = Meteor.user();
				if (user) {
					let email = user.profile.email;
					this.setDisplayNameToEmail(email);
				}
			}
		});
	}

	setDisplayNameToEmail(email) {
		this.$timeout(() => {
			let display = angular.element(document).find('#login-name-link');
			console.log(display)
			display.text(email + ' ▾');
		}, 100);
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
