import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngTable from 'ng-table';
import Notifications from 'angular-ui-notification';

import gSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import inputStars from 'angular-input-stars';

import dataTableFormatter from '../../services/data-format-factory'
import notification from '../../services/notification-factory'
import validator from '../../services/validator'

import template from './respondentBroker.html';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';
import {name as Dashboard} from '../dashboard/dashboard';
import {name as MyProjectsTab} from '../myProjectsTab/myProjectsTab';
import {name as ProjectsTab} from '../projectsTab/projectsTab';
import {name as ProjectAdd} from '../projectAdd/projectAdd';
import {name as ProjectRemove} from '../projectRemove/projectRemove';
import {name as ProjectEdit} from '../projectEdit/projectEdit';
import {name as ProjectDetails} from '../projectDetails/projectDetails';
import {name as UsersTab} from '../usersTab/usersTab';
import {name as UserEdit} from '../userEdit/userEdit';
import {name as UserDetails} from '../userDetails/userDetails';
import {name as LeftPanel} from '../leftPanel/leftPanel';
import {name as ResponseView} from '../responseView/responseView';
import {name as StepView} from '../stepView/stepView';

class RespondentBroker {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
	}

}
const name = 'respondentBroker';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	Dashboard,
	DynamicTable,
	MyProjectsTab,
	ProjectsTab,
	ProjectAdd,
	ProjectRemove,
	ProjectEdit,
	ProjectDetails,
	UsersTab,
	UserEdit,
	UserDetails,
	LeftPanel,
	ResponseView,
	StepView,
	'angular-input-stars',
	'ngSanitize',
	'ngMaterial',
	'ngAria',
	'ngAnimate',
	'ngTable',
	'accounts.ui',
]).component(name, {
	template,
	controllerAs: name,
	controller: RespondentBroker
})
	.config(config)
	.run(run)
	.factory('dataTableFormatter', dataTableFormatter)
	.factory('notification', notification)
	.factory('validator', validator);

function config($locationProvider, $urlRouterProvider) {
	'ngInject';
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/dashboard');
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