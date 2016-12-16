import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './projectAdd.html';
import {Projects} from '../../../api/projects';
import {dateNowString} from '../../../helpers/helpers';

class ProjectAdd {
	constructor(Notification) {
		'ngInject';
		this.Notification = Notification;

		this.project = {};

		this.pageTitle = 'Add new project ';
		this.icon = 'plus-circle';
		this.color = 'green';
	}

	submit() {
		this.project.owner = Meteor.userId();
		this.project.responses = 0;
		this.project.created= dateNowString();
		this.project.updated = dateNowString();
		Projects.insert(this.project);
		this.reset();
		this.Notification.success('Project added successfully!');
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