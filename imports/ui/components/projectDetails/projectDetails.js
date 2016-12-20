import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './projectDetails.html';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

class ProjectDetails {
	constructor($stateParams, $scope, $reactive, $state, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Project details';
		this.icon = 'check-square-o';
		this.color = 'yellow';

		this.response = {};
		this.response.steps = [];

		this.helpers({
			project() {
				return Projects.findOne({
					_id: this.projectId
				});
			},
			isMyProject() {
				let project = Projects.findOne({_id: this.projectId});
				if (project) {
					return Meteor.userId() === project.owner;
				}
			},
		});
	}

	reset() {
		this.temp = {};
	}

	remove (step) {
		let index = this.response.steps.indexOf(step);
		this.response.steps.splice(index, 1);
	}

	addNew() {
		this.response.steps.push({
			movieTag: this.temp.movieTag,
			movieURL: this.temp.movieURL
		});
		this.reset();
	}

	addToUser(id) {
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$push: {
				'profile.responses': id,
			}
		}, (error) => {
			if (error) {
				this.notification.error('There is problem with add your response to user! Error: ' + error);
			} else {

				this.notification.success('Your response was updated successfully!');
				this.$state.go('projects');
			}
		});
	}

	addToProject(id) {
		Projects.update({
			_id: this.project._id
		}, {
			$push: {
				responses: id,
			}
		}, (error) => {
			if (error) {
				this.notification.error('There is problem with add your response to project! Error: ' + error);
			} else {
				this.addToUser(id);

			}
		});
	}

	confirm() {
		this.response.owner = Meteor.userId();
		this.response.project = this.projectId;
		Responses.insert(angular.copy(this.response),
			(error, id) => {
				if (error) {
					this.notification.error('There is problem with add your response! Error: ' + error);
				}
				else {
					this.addToProject(id);
				}
			}
		);

		// 	this.project.responses++;
		// 	console.log(this.project.responses);
		// 	Projects.update({
		// 		_id: this.project._id
		// 	}, {
		// 		$set: {
		// 			responses: this.project.responses,
		// 		}
		// 	});
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