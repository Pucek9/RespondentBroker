import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {PROJECT_REMOVE as PAGE} from '../../../helpers/constants';
import template from './projectRemove.html';
import {Projects} from '../../../api/projects';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $window, $filter, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.translate = $filter('translate');
		this.$state = $state;
		this.bigScreen = $window.innerWidth >= 768;
		this.notification = notification;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

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
			this.notification.success(this.translate('PROJECT_REMOVE_SUCCESS'));
			this.$state.go('projectsMy');
		}
	}
}

export default angular.module(PAGE.name, [
	angularMeteor
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