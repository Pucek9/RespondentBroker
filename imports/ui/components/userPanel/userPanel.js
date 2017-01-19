import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import template from './userPanel.html';


class Controller {

	constructor($scope, $reactive, $timeout, $translate) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$timeout = $timeout;
		this.$translate = $translate;
		this.languages = ['en', 'pl'];

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
			},
		});
	}

	updateLanguage = function (language) {
		this.language = language;
		this.$translate.use(this.language);
		this.updateUser()
	};

	updateUser() {
		Meteor.users.update({
			_id: this.user._id
		}, {
			$set: {
				'profile.language': this.language,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to update language... Error: ' + error.message);
				console.log(error);
			}
		});
	}

	initLanguage() {
		let user = Meteor.user();
		if (user) {
			let language = user.profile.language;
			this.updateLanguage(language);
		}
	}

	setDisplayNameToEmail(email) {
		this.$timeout(() => {
			let display = angular.element(document).find('#login-name-link');
			display.text(email + ' ▾');
			this.initLanguage();
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
