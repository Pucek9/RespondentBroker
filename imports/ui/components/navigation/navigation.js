import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import template from './navigation.html';

class Navigation {

	constructor($scope, $reactive, $timeout, $state) {
		'ngInject';
		$reactive(this).attach($scope);
		this.$state = $state;
this.$timeout = $timeout;
		this.helpers({
			positions() {
				let userId = Meteor.userId();
				return [
					{
						name: 'Dashboard', icon: 'line-chart', state: 'dashboard', href: '/',
					},
					{
						name: 'My Projects', icon: 'dashboard', state: 'myProjects', href: '/projects/my',
					},
					{
						name: 'Projects', icon: 'search', state: 'projects', href: '/projects',
					},
					// {
					// 	name: 'History', icon: 'history', href: '/history',
					// },
					{
						name: 'Users', icon: 'users', state: 'users', href: '/users',
					},
					{
						name: 'Account', icon: 'address-card-o', state: 'userDetails', href: '/users/' + userId + '/details',
					},
					{
						name: 'Settings', icon: 'cog', state: 'userEdit', href: '/users/' + userId + '/edit',
					}
				]
			}
		});

	};

	checkState(position, index) {
		this.$timeout(()=>{
			if (this.$state.current.name === position.state) {
				this.setActive(index);
			}
		},100);
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