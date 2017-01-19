import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import template from './userPanel.html';


class Controller {

	constructor($scope, $reactive, $timeout, $translate) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$timeout = $timeout;

		this.language = 'en';
		this.languages = ['en', 'pl'];
		this.updateLanguage = function(language) {
			$translate.use(language);
		};

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
			display.text(email + ' ▾');
		}, 100);
	}

}
const name = 'userPanel';

export default angular.module(name, [
	angularMeteor,
]).component(name, {
	template,
	controller: Controller
})
