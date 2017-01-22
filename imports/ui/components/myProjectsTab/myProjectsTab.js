import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Projects} from '../../../api/projects';
import {PROJECTS_MY as PAGE} from '../../../helpers/constants';
import {interpolatedValue} from '../../../helpers/helpers';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';

import template from './myProjectsTab.html';
import actionsTemplate from './actions.html';

class Controller {

	constructor($scope, $reactive, $interpolate, $filter, NgTableParams) {
		'ngInject';
		$reactive(this).attach($scope);
		this.NgTableParams = NgTableParams;
		this.userId = Meteor.userId();
		[this.pageTitle,this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.translate = $filter('translate');

		this.helpers({
			projects() {
				return Projects.find({owner: this.userId}, {sort: {name: 1}});
			}
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "name", filter: {name: "text"}, show: true, sortable: "name", title: this.translate('PROJECT.NAME'),
				getValue: interpolatedValue, interpolateExpr: $interpolate('<a href="projects/{{row._id}}/details">{{row.name}}</a>')
			},
			{field: "minPoints", filter: {minPoints: "number"}, show: true, sortable: "minPoints", title: this.translate('MIN_POINTS')},
			{field: "maxPoints", filter: {maxPoints: "number"}, show: true, sortable: "maxPoints", title: this.translate('MAX_POINTS')},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: this.translate('CREATE_DATE')},
			{field: "updated", filter: {created: "text"}, show: true, sortable: "updated", title: this.translate('LAST_UPDATE')},
			{field: "statusActive", filter: {statusActive: "text"}, show: true, sortable: "statusActive", title: this.translate('ACTIVE')},
			{
				field: "responses",
				show: true,
				title: this.translate('RESPONSES'),
				sortable: "responses.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.responses.length}} {{ row.autoDeactivate ? '/'+row.autoDeactivateCount.toString() : ''}}`)
			},
			{
				field: "tasks",
				show: true,
				title: this.translate('STEPS'),
				sortable: "tasks.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.tasks.length}}`)
			},
			{
				field: "_id",
				show: true,
				title: this.translate('ACTIONS'),
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