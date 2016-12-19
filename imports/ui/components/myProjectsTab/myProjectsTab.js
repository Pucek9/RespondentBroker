import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './myProjectsTab.html';
import {Projects} from '../../../api/projects';
// import {name as ProjectAdd} from '../projectAdd/projectAdd';
// import {name as ProjectRemove} from '../projectRemove/projectRemove';
// import {name as DynamicTable} from '../dynamicTable/dynamicTable';
// import {name as Actions} from '../actions/actions';
import {name as NormalTable} from '../normalTable/normalTable';

class MyProjectsTab {

	constructor($scope, $reactive, dataTableFormatter) {
		'ngInject';
		$reactive(this).attach($scope);
		// this.dataTableFormatter = dataTableFormatter;
		this.pageTitle = 'My Projects ';
		this.icon = 'search';
		this.color = 'blue';
		this.userId = Meteor.userId();

		this.helpers({
			projects() {
				return Projects.find({owner: this.userId});
			}
		});

		// this.params = {formatTittle: true, hideId: true, dateColumn: 'created'};
		//
		// this.columns = [
		// 	{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
		// 	{field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name"},
		// 	{field: "responses", filter: {responses: "text"}, show: true, sortable: "responses", title: "Responses"},
		// 	{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Created"},
		// 	{field: "updated", filter: {created: "text"}, show: true, sortable: "updated", title: "Updated"},
		// 	{field: "actions", show: true, title: "Actions"}
		// ];


	};

	// $onInit() {
	// 	this.renderTable();
	// };

	// renderTable() {
	// 	this.dataSet = this.NgTableParams({
	// 		page: 1,
	// 		count: 5
	// 	}, {
	// 		counts: [5, 10, 25],
	// 		dataset: this.projects
	// 	});
	//
	// };

}

const name = 'myProjectsTab';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	// ProjectAdd,
	// ProjectRemove,
	// Actions,
	NormalTable,
	// DynamicTable
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