import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {
	ABOUT,
	ARCHIVE,
	DASHBOARD,
	MY_PROJECTS_TAB,
	PROJECT_ADD,
	PROJECT_DETAILS,
	PROJECT_EDIT,
	PROJECT_PREVIEW,
	PROJECT_REMOVE,
	PROJECTS_TAB,
	RESPONSE_VIEW,
	STEP_VIEW,
	USER_DETAILS,
	USER_EDIT,
	USERS_TAB
} from '../../../helpers/constants';;
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
						name: MY_PROJECTS_TAB.pageTitle, icon: MY_PROJECTS_TAB.icon, state: MY_PROJECTS_TAB.state, href: MY_PROJECTS_TAB.url,
					},
					{
						name: PROJECTS_TAB.pageTitle, icon: PROJECTS_TAB.icon, state: PROJECTS_TAB.state, href: PROJECTS_TAB.url,
					},
					{
						name: ARCHIVE.pageTitle, icon: ARCHIVE.icon, state: ARCHIVE.state, href: ARCHIVE.url,
					},
					{
						name: USERS_TAB.pageTitle, icon: USERS_TAB.icon, state: USERS_TAB.state, href: USERS_TAB.url,
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