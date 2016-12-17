import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import template from './projectEdit.html';
import {dateNowString} from '../../../helpers/helpers';

class ProjectEdit {
	constructor($stateParams, $scope, $reactive, $state, notification) {

		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Update your project ';
		this.icon = 'refresh';
		this.color = 'blue';

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			}
		});
	}

	confirm() {
		Projects.update({
			_id: this.project._id
		}, {
			$set: {
				name: this.project.name,
				description: this.project.description,
				surveyURL: this.project.surveyURL,
				application: this.project.application,
				updated: dateNowString()
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to update the project...');
			} else {
				this.$state.go('myProjects');
					this.notification.success('Your project was updated successfully!');
			}

		});
	}
}

const name = 'projectEdit';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: ProjectEdit
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('projectEdit', {
		url: '/projects/:projectId/edit',
		template: '<project-edit></project-edit>',
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