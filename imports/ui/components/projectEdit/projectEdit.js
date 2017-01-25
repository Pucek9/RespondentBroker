import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {PROJECT_EDIT as PAGE} from '../../../helpers/constants';
import template from './projectEdit.html';
import {dateNowString} from '../../../helpers/helpers';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $window, notification, validator) {

		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;
		this.validator = validator;
		this.bigScreen = $window.innerWidth >= 768;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		// this.task = {}
		this.helpers({
			project() {
				return Projects.findOne({_id: $stateParams.projectId});
			},
		});
	}

	addNewTask() {
		let task = {name: '', description: ''};
		this.project.tasks.push(task);
		this.task = task;
		angular.element('#taskname').focus();
	}

	remove(index) {
		this.project.tasks.splice(index, 1);
		this.task = this.project.tasks[this.project.tasks.length-1];
	}

	updateProject() {
		Projects.update({
			_id: this.project._id
		}, {
			$set: {
				name: this.project.name,
				description: this.project.description,
				tasks: JSON.parse(angular.toJson(this.project.tasks)),
				minPoints: this.project.minPoints,
				maxPoints: this.project.maxPoints,
				isStepRating: this.project.isStepRating,
				isStepDescription: this.project.isStepDescription,
				surveyURL: this.project.surveyURL,
				application: this.project.application,
				ratingTitle: this.project.ratingTitle,
				statusActive: this.project.statusActive,
				autoDeactivate: this.project.autoDeactivate,
				autoDeactivateCount: this.project.autoDeactivateCount,
				multipleResponses: this.project.multipleResponses,
				updated: dateNowString()
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to update the project...', error.message);
			} else {
				this.$state.go('projectsMy');
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

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter
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