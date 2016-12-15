import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';

class Navigation {

	constructor() {
		this.index = 0;

		this.positions = [
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
				name: 'User', icon: 'user', href: '#',
			},
			{
				name: 'Settings', icon: 'cog', href: '/settings',
			}
		];
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