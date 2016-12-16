import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './projectRemove.html';
import {Projects} from '../../../api/projects';

class ProjectRemove {
	constructor($stateParams,$scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);

		this.pageTitle = 'Remove project:';
		this.icon = 'remove';
		this.color = 'red';

		this.helpers({
			project() {
				return Projects.findOne({
					_id: $stateParams.projectId
				});
			}
		});
	}

	confirm() {
		if (this.project) {
			Projects.remove(this.project._id);
		}
	}
}

const name = 'projectRemove';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	// bindings: {
	// 	project: '='
	// },
	controllerAs: name,
	controller: ProjectRemove
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('projectRemove', {
		url: '/projects/:projectId/remove',
		template: '<project-remove></project-remove>',
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