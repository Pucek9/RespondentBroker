import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './projectDetails.html';
import {Projects} from '../../../api/projects';

class ProjectDetails {
	constructor($stateParams, $scope, $reactive,  $state, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Project details';
		this.icon = 'check-square-o';
		this.color = 'yellow';

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			}
		});
	}

	confirm() {
		this.project.responses++;
		console.log(this.project.responses)
		Projects.update({
			_id: this.project._id
		}, {
			$set: {
				responses: this.project.responses,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to update the project...');
			} else {
				this.notification.success('Your project was updated successfully!');
				this.$state.go('projects');
			}

		});
	}

}

const name = 'projectDetails';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
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