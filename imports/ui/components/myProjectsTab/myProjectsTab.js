import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {PROJECTS_MY as PAGE} from '../../../helpers/constants';
import {interpolatedValue} from '../../../helpers/helpers';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';

import template from './myProjectsTab.html';
import actionsTemplate from './actions.html';

class Controller {

	constructor($scope, $reactive, $interpolate, NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.NgTableParams = NgTableParams;
		[this.pageTitle,this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.userId = Meteor.userId();

		this.helpers({
			projects() {
				return Projects.find({owner: this.userId}, {sort: {name: 1}});
			}
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name",
				getValue: interpolatedValue, interpolateExpr: $interpolate('<a href="projects/{{row._id}}/details">{{row.name}}</a>')
			},
			{field: "minPoints", filter: {minPoints: "number"}, show: true, sortable: "minPoints", title: "Min points"},
			{field: "maxPoints", filter: {maxPoints: "number"}, show: true, sortable: "maxPoints", title: "Max points"},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Created"},
			{field: "updated", filter: {created: "text"}, show: true, sortable: "updated", title: "Updated"},
			{field: "statusActive", filter: {statusActive: "text"}, show: true, sortable: "statusActive", title: "Active"},
			{
				field: "responses",
				show: true,
				title: "Replies",
				sortable: "responses.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.responses.length}} {{ row.autoDeactivate ? '/'+row.autoDeactivateCount.toString() : ''}}`)
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

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
	DynamicTable
]).component(PAGE.name, {
	template,
	controller: Controller
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state(PAGE.name, {
			url: PAGE.url,
			template: PAGE.template
		});
}