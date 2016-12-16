import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './projectDetails.html';
import {Projects} from '../../../api/projects';

class ProjectDetails {
	constructor($stateParams, $scope, $reactive, Notification) {
		'ngInject';
		$reactive(this).attach($scope);

		this.projectId = $stateParams.projectId;
		this.Notification = Notification;

		this.pageTitle = 'Project details';
		this.icon = 'check-square-o';
		this.color= 'yellow';

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			}
		});
	}

	confirm() {
		this.Notification.success('Success notification');
	}

}

const name = 'projectDetails';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: ProjectDetails
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('projectDetails', {
		url: '/projects/:projectId/details',
		template: '<project-details></project-details>',
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