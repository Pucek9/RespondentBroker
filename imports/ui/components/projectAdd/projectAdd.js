import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './projectAdd.html';
import {Projects} from '../../../api/projects';
import moment from 'moment';
import DATE_MASK from '../../../helpers/constants';

class ProjectAdd {
	constructor() {
		this.project = {};
		this.pageTitle = 'Add new project ';
		this.icon = 'plus-circle';
	}

	submit() {
		this.project.owner = Meteor.userId();
		this.project.createDate = moment().format(DATE_MASK);
		this.project.updateDate = moment().format(DATE_MASK);
		Projects.insert(this.project);
		this.reset();
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