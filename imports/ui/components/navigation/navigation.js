import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {
	ABOUT,
	DASHBOARD,
	PROJECTS_ARCHIVE,
	PROJECTS_MY,
	PROJECTS,
	USER_DETAILS,
	USER_EDIT,
	USERS
} from '../../../helpers/constants';
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
						name: ABOUT.pageTitle, icon: ABOUT.icon, state: ABOUT.state, href: ABOUT.url,
					},
					{
						name: DASHBOARD.pageTitle, icon: DASHBOARD.icon, state: DASHBOARD.state, href: DASHBOARD.url,
					},
					{
						name: PROJECTS_MY.pageTitle, icon: PROJECTS_MY.icon, state: PROJECTS_MY.state, href: PROJECTS_MY.url,
					},
					{
						name: PROJECTS.pageTitle, icon: PROJECTS.icon, state: PROJECTS.state, href: PROJECTS.url,
					},
					{
						name: PROJECTS_ARCHIVE.pageTitle, icon: PROJECTS_ARCHIVE.icon, state: PROJECTS_ARCHIVE.state, href: PROJECTS_ARCHIVE.url,
					},
					{
						name: USERS.pageTitle, icon: USERS.icon, state: USERS.state, href: USERS.url,
					},
					{
						name: USER_DETAILS.pageTitle, icon: USER_DETAILS.icon, state: USER_DETAILS.state, href: '/users/' + userId + '/details',
					},
					{
						name: USER_EDIT.pageTitle, icon: USER_EDIT.icon, state: USER_EDIT.state, href: '/users/' + userId + '/edit',
					},
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