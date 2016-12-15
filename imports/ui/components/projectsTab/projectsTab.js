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

		this.helpers({
			projects() {
				return Projects.find({});
			}

		});


		// this.getProjects = () => {
		// 	return this.projects;
		// };
		// this.data = this.getProjects();

		// this.params = {formatTittle: true, hideId: true, dateColumn: 'createDate'};

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{field: "projectName", filter: {projectName: "text"}, show: true, sortable: "projectName", title: "Project Name"},
			{field: "responses", filter: {responses: "text"}, show: true, sortable: "responses", title: "Responses"},
			{field: "createDate", filter: {createDate: "text"}, show: true, sortable: "createDate", title: "Create Date"},
			{field: "updateDate", filter: {createDate: "text"}, show: true, sortable: "updateDate", title: "Last Update"},
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