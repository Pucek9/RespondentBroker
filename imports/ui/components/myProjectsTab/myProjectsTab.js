import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './myProjectsTab.html';
import {Projects} from '../../../api/projects';
import {name as ProjectAdd} from '../projectAdd/projectAdd';
// import {name as ProjectRemove} from '../projectRemove/projectRemove';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';

class MyProjectsTab {

	constructor($scope, $reactive, dataTableFormatter) {
		'ngInject';
		$reactive(this).attach($scope);
		// this.dataTableFormatter = dataTableFormatter;
		this.pageTitle = 'My Projects ';
		this.icon = 'search';
		this.userId = Meteor.userId();

		this.helpers({
			projects() {
				return Projects.find({owner: this.userId});
			}
		});


		this.params = {formatTittle: true, hideId: true, dateColumn: 'createDate'};
		//
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

const name = 'myProjectsTab';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	ProjectAdd,
	// ProjectRemove,
	DynamicTable
]).component(name, {
	template,
	controllerAs: name,
	controller: MyProjectsTab
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state('myProjects', {
			url: '/projects/my',
			template: '<my-projects-tab></my-projects-tab>'
		});
}