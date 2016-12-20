import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';

import {interpolatedValue} from '../../../helpers/helpers';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';
import template from './myProjectsTab.html';
import actionsTemplate from './actions.html';

class MyProjectsTab {

	constructor($scope, $reactive, $interpolate, NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.NgTableParams = NgTableParams;
		this.pageTitle = 'My Projects ';
		this.icon = 'search';
		this.color = 'blue';
		this.userId = Meteor.userId();

		this.helpers({
			projects() {
				return Projects.find({owner: this.userId});
			}
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name"},
			{field: "points", filter: {points: "number"}, show: true, sortable: "points", title: "Points"},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Created"},
			{field: "updated", filter: {created: "text"}, show: true, sortable: "updated", title: "Updated"},
			{
				field: "responses",
				show: true,
				title: "Responses",
				sortable: "responses.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.responses.length}}`)
			},
			{
				field: "_id",
				show: true,
				title: "Actions",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(actionsTemplate)
			}
		];

	};

}

const name = 'myProjectsTab';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
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