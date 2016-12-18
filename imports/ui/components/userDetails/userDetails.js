import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import template from './userDetails.html';

class UserDetails {
	constructor($stateParams, $scope, $reactive, $state, notification) {

		'ngInject';
		$reactive(this).attach($scope);
		this.userId = $stateParams.userId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Account Details ';
		this.icon = 'account';
		this.color = 'yellow';

		this.helpers({
			user() {
				return Meteor.users.findOne({
					_id: this.userId
				});
			}
		});
	}


}

const name = 'userDetails';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: UserDetails
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('userDetails', {
		url: '/users/:userId/details',
		template: '<user-Details></user-Details>',
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