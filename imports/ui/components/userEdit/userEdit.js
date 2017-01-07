import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import template from './userEdit.html';
import {dateNowString} from '../../../helpers/helpers';
import {ImagesStore} from '../../../api/files';
import {name as SingleFileUpload} from '../upload/singleFileUpload';

class UserEdit {
	constructor($stateParams, $scope, $reactive, $state, notification) {

		'ngInject';
		$reactive(this).attach($scope);
		this.userId = $stateParams.userId;
		this.$state = $state;
		this.notification = notification;
		this.$scope = $scope;
		this.pageTitle = 'Update your Account ';
		this.icon = 'refresh';
		this.color = 'blue';
		this.ImageStore = ImagesStore;
		this.helpers({

			user() {
				return Meteor.user();
			}
		});
	}

	confirm() {
		Meteor.users.update({
			_id: this.user._id
		}, {
			$set: {
				'profile.name': this.user.profile.name,
				'profile.forName': this.user.profile.forName,
				'profile.avatar': this.user.profile.avatar,
				'profile.email': this.user.profile.email,
				'emails.0.address': this.user.profile.email,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to update the User... Error: ' + error.message);
				console.log(error);
			} else {
				this.$state.go('users');
				this.notification.success('Your User was updated successfully!');
			}

		});
	}
}

const name = 'userEdit';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	SingleFileUpload
]).component(name, {
	template,
	controllerAs: name,
	controller: UserEdit
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('userEdit', {
		url: '/users/:userId/edit',
		template: '<user-edit></user-edit>',
		resolve: {
			currentUser($q) {
				if (Meteor.userId() === null) {
					return $q.reject('AUTH_REQUIRED');
				} else {
					return $q.resolve();
				}
			}
		}
	});
}