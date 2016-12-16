import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngTable from 'ng-table';
import Notifications from 'angular-ui-notification';

import dataTableFormatter from '../../services/data-format-factory'

import template from './respondentBroker.html';
import {name as Dashboard} from '../dashboard/dashboard';
import {name as MyProjectsTab} from '../myProjectsTab/myProjectsTab';
import {name as ProjectsTab} from '../projectsTab/projectsTab';
import {name as ProjectAdd} from '../projectAdd/projectAdd';
import {name as ProjectRemove} from '../projectRemove/projectRemove';
import {name as ProjectEdit} from '../projectEdit/projectEdit';
import {name as ProjectDetails} from '../projectDetails/projectDetails';
import {name as UsersTab} from '../usersTab/usersTab';
import {name as LeftPanel} from '../leftPanel/leftPanel';

class RespondentBroker {
}

const name = 'respondentBroker';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	Dashboard,
	MyProjectsTab,
	ProjectsTab,
	ProjectAdd,
	ProjectRemove,
	ProjectEdit,
	ProjectDetails,
	UsersTab,
	LeftPanel,
	'ui-notification',
	'ngTable',
	'accounts.ui'
]).component(name, {
	template,
	controllerAs: name,
	controller: RespondentBroker
})
	.config(config)
	.run(run)
	.factory('dataTableFormatter',dataTableFormatter);

function config($locationProvider, $urlRouterProvider, NotificationProvider) {
	'ngInject';
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/dashboard');

	NotificationProvider.setOptions({
		delay: 10000,
		startTop: 20,
		startRight: 10,
		verticalSpacing: 20,
		horizontalSpacing: 20,
		positionX: 'left',
		positionY: 'bottom'
	});
}

function run($rootScope, $state) {
	'ngInject';
	$rootScope.$on('$stateChangeError',
		(event, toState, toParams, fromState, fromParams, error) => {
			if (error === 'AUTH_REQUIRED') {
				$state.go('projects');
			}
		}
	);
}