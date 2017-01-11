import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';

import {dateNowString} from '../../../helpers/helpers';
import {ApplicationsStore} from '../../../api/files';
import {name as SingleFileUpload} from '../upload/singleFileUpload';
import template from './projectAdd.html';

class ProjectAdd {
	constructor($scope, $reactive, $state, notification, validator) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$state = $state;
		this.notification = notification;
		this.ApplicationsStore = ApplicationsStore;
		this.validator = validator;

		this.pageTitle = 'Add new project ';
		this.icon = 'plus-circle';
		this.color = 'green';

		this.project = {};

		this.helpers({
			userPoints(){
				const user = Meteor.user();
				if (user) {
					return user.profile.points;
				}
			}
		});

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
					this.notification.error('There is problem with add your project! Error: ' + error.message);
				}
				else {
					this.decreasePoints(id);
				}
			}
		);
	}

	submit(valid) {
		if (valid) {
			const user = Meteor.user();
			if (this.validator.project(this.project, user)) {
				this.addProject();
			}
		} else {
			this.notification.error('Your form is not valid');
		}

	}
}

const name = 'projectAdd';

// create a module
export default angular.module(name, [
	angularMeteor,
	SingleFileUpload
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