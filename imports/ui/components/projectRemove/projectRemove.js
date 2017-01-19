import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {PROJECT_REMOVE as PAGE} from '../../../helpers/constants';
import template from './projectRemove.html';
import {Projects} from '../../../api/projects';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$state = $state;
		this.notification = notification;
		[this.pageTitle, this.icon, this.color] = [PAGE.pageTitle, PAGE.icon, PAGE.color];

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			}
		});
	}

	confirm() {
		if (this.project) {
			Projects.remove(this.project._id);
			this.notification.success('Your project was removed successfully!');
			this.$state.go('myProjects');
		}
	}
}

export default angular.module(PAGE.name, [
	angularMeteor
]).component(PAGE.name, {
	template,
	controller: Controller
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider
		.state(PAGE.name, {
			url: PAGE.url,
			template: PAGE.template,
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