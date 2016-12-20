import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './navigation.html';

class Navigation {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);

		this.index = 0;

		this.helpers({
			positions() {
				let userId = Meteor.userId();
				return [
					{
						name: 'Dashboard', icon: 'dashboard', href: '/',
					},
					{
						name: 'My Projects', icon: 'dashboard', href: '/projects/my',
					},
					{
						name: 'Projects', icon: 'search', href: '/projects',
					},
					{
						name: 'History', icon: 'history', href: '/history',
					},
					{
						name: 'Users', icon: 'users', href: '/users',
					},
					{
						name: 'Account', icon: 'address-card-o', href: '/users/' + userId + '/details',
					},
					{
						name: 'Settings', icon: 'cog', href: '/users/' + userId + '/edit',
					}
				]
			}
		});

	};

	setActive(index) {
		this.index = index;
	};

	isActive(index) {
		return this.index === index;
	};

}
const name = 'navigation';

// create a module
export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs: name,
	controller: Navigation
});