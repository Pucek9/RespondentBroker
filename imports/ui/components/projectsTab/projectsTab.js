import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './projectsTab.html';
import {Projects} from '../../../api/projects';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';

class ProjectsTab {
	constructor($scope, $reactive, dataTableFormatter) {
		'ngInject';
		$reactive(this).attach($scope);
		// this.dataTableFormatter = dataTableFormatter;
		this.pageTitle = 'Projects ';
		this.icon = 'search';
		this.color = 'yellow';

		this.helpers({
			projects() {
				return Projects.find({});
			}
		});
		// this.data = this.getProjects();
		// this.params = {formatTittle: true, hideId: true, dateColumn: 'createDate'};

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name"},
			{field: "responses", filter: {responses: "text"}, show: true, sortable: "responses", title: "Responses"},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Creatd"},
			{field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			{field: "owner", filter: {owner: "text"}, show: true, sortable: "owner", title: "Owner"}
		];
	}
}

const name = 'projectsTab';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	DynamicTable
]).component(name, {
	template,
	controllerAs: name,
	controller: ProjectsTab
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('projects', {
			url: '/projects',
			template: '<projects-tab></projects-tab>'
		});
}