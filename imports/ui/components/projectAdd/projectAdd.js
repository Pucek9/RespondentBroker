import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';

import {dateNowString} from '../../../helpers/helpers';
import template from './projectAdd.html';

class ProjectAdd {
	constructor($state, notification, validator) {
		'ngInject';
		this.$state = $state;
		this.notification = notification;
		this.validator = validator;
		this.project = {};

		this.pageTitle = 'Add new project ';
		this.icon = 'plus-circle';
		this.color = 'green';
	}


	decreasePoints(id) {
		Meteor.users.update({
			_id: this.project.owner
		}, {
			$inc: {
				'profile.points': -this.project.maxPoints,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to remove poitns for User... Error: ' + error.message);
				console.log(error);
			} else {
				this.notification.success('Your project was added successfully!');
				this.$state.go('projectDetails', {projectId: id});
			}
		});
	}

	addProject() {
		this.project.owner = Meteor.userId();
		this.project.responses = [];
		this.project.created = dateNowString();
		this.project.updated = dateNowString();
		Projects.insert(this.project,
			(error, id) => {
				if (error) {
					this.notification.error('There is problem with add your project! Error: ' + error);
				}
				else {
					this.decreasePoints(id);
				}
			}
		);
	}

	submit() {
		const user = Meteor.user();
		if (this.validator.project(this.project, user)) {
			this.addProject();
		}
	}

	test(a) {
		console.log(a)
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