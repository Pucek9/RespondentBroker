import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import template from './projectEdit.html';
import {dateNowString} from '../../../helpers/helpers';

class ProjectEdit {
	constructor($stateParams, $scope, $reactive, $state, notification, validator) {

		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;
		this.validator = validator;

		this.pageTitle = 'Update your project ';
		this.icon = 'refresh';
		this.color = 'blue';

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			},
			// userPoints(){
			// 	const user = Meteor.user();
			// 	if(user){
			// 		return user.profile.points;
			// 	}
			// }
		});
	}

	updateProject() {
		Projects.update({
			_id: this.project._id
		}, {
			$set: {
				name: this.project.name,
				description: this.project.description,
				minPoints: this.project.minPoints,
				maxPoints: this.project.maxPoints,
				isStepRating: this.project.isStepRating,
				isStepDescription: this.project.isStepDescription,
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

	confirm(isValid) {
		if (isValid) {
			const user = Meteor.user();
			if (this.validator.project(this.project, user)) {
				this.updateProject();
			}
		}
		 else {
			this.notification.error('Your form is not valid');
		}
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