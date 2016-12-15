import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './usersTab.html';
// import {name as ProjectAdd} from '../projectAdd/projectAdd';
// import {name as ProjectRemove} from '../projectRemove/projectRemove';
// import {name as DynamicTable} from '../dynamicTable/dynamicTable';

class UsersTab {
	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);

		this.pageTitle = 'Users';
		this.icon = 'users';

		this.helpers({

			users() {
				console.log('x');
				return Meteor.users.find({}).fetch()
			}

		});

	}


}

const name = 'usersTab';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs: name,
	controller: UsersTab
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('users', {
			url: '/users',
			template: '<users-tab></users-tab>'
		});
}