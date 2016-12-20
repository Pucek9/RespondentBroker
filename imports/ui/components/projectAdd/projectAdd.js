import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './projectAdd.html';
import {Projects} from '../../../api/projects';
import {dateNowString} from '../../../helpers/helpers';

class ProjectAdd {
	constructor($state, notification) {
		'ngInject';
		this.$state = $state;
		this.notification = notification;
		this.project = {};

		this.pageTitle = 'Add new project ';
		this.icon = 'plus-circle';
		this.color = 'green';
	}

	submit() {
		this.project.owner = Meteor.userId();
		this.project.responses = [];
		this.project.created= dateNowString();
		this.project.updated = dateNowString();
		Projects.insert(this.project,
			(error, id) => {
				if (error) {
					this.notification.error('There is problem with add your project! Error: ' + error);
				}
				else {
					this.reset();
					this.notification.success('Your project was added successfully!');
					this.$state.go('projectDetails',{projectId: id});
				}
			}
		);
	}

	reset() {
		this.project = {};
	}
}

const name = 'projectAdd';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs: name,
	controller: ProjectAdd
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('projectAdd', {
			url: '/projects/new',
			template: '<project-add></project-add>',
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