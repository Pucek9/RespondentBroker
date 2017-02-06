import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';

import {dateNowString} from '../../../helpers/helpers';
import {ApplicationsStore} from '../../../api/files';
import {name as SingleFileUpload} from '../upload/singleFileUpload';
import {PROJECT_ADD as PAGE} from '../../../helpers/constants';
import template from './projectAdd.html';

class Controller {
	constructor($scope, $reactive, $state, $window, $filter, notification, validator) {
		'ngInject';
		$reactive(this).attach($scope);
		this.translate = $filter('translate');
		this.$state = $state;
		this.userId = Meteor.userId();
		this.bigScreen = $window.innerWidth >= 768;
		this.notification = notification;
		this.ApplicationsStore = ApplicationsStore;
		this.validator = validator;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.project = {
			statusActive: true,
			tasks: [{
				name: '',
				description: ''
			}]
		};
		this.task = this.project.tasks[0];

		this.helpers({
			userPoints(){
				const user = Meteor.user();
				if (user) {
					return user.profile.points;
				}
			},
			projects() {
				return Projects.find({owner: this.userId});
			}
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

	decreasePoints(id) {
		Meteor.users.update({
			_id: this.project.owner
		}, {
			$inc: {
				'profile.points': -this.project.maxPoints,
			}
		}, (error) => {
			if (error) {
				this.notification.error(this.translate('UNABLE_REMOVE_POINTS') + error.message);
				console.log(error);
			} else {
				this.notification.success(this.translate('PROJECT_ADDED_SUCCESS') );
				this.$state.go('projectPreview', {projectId: id});
			}
		});
	}

	addProject() {
		this.project._id = undefined;
		this.project = JSON.parse(angular.toJson(this.project))
		this.project.tasks = JSON.parse(angular.toJson(this.project.tasks));
		this.project.owner = this.userId;
		this.project.responses = [];
		this.project.created = dateNowString();
		this.project.updated = dateNowString();
		console.log(this.project)
		Projects.insert(this.project,
			(error, id) => {
				if (error) {
					this.notification.error(this.translate('PROJECT_ADD_PROBLEM') + error.message);
				}
				else {
					this.decreasePoints(id);
				}
			}
		);
	}

	confirm(valid) {
		if (valid) {
			const user = Meteor.user();
			if (this.validator.project(this.project, user)) {
				this.addProject();
			}
		} else {
			this.notification.error(this.translate('FORM_INVALID'));
		}

	}
}

export default angular.module(PAGE.name, [
	angularMeteor,
	SingleFileUpload
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