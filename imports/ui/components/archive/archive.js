import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './archive.html';
import {Projects} from '../../../api/projects';

import {name as DynamicTable} from '../dynamicTable/dynamicTable';
import {ARCHIVE as PAGE} from '../../../helpers/constants';
import {interpolatedValue} from '../../../helpers/helpers';

class Controller {
	constructor($scope, $reactive, $interpolate) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle,this.icon,this.color] = [PAGE.pageTitle, PAGE.icon, PAGE.color];

		this.helpers({
			projects() {
				return Projects.find({statusActive: false},{sort: {name: 1}});
			},
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name",
				getValue: interpolatedValue, interpolateExpr: $interpolate('<a href="projects/{{row._id}}/preview">{{row.name}}</a>')
			},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Created"},
			{field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			{field: "owner", filter: {owner: "text"}, show: false, sortable: "owner", title: "Owner"},
			{field: "minPoints", filter: {minPoints: "number"}, show: true, sortable: "minPoints", title: "Min points"},
			{field: "maxPoints", filter: {maxPoints: "number"}, show: true, sortable: "maxPoints", title: "Max points"},
			{
				field: "responses",
				show: true,
				title: "Replies",
				sortable: "responses.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.responses.length}} {{ row.autoDeactivate ? '/'+row.autoDeactivateCount.toString() : ''}}`)
			},
		];
	}
}

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
	DynamicTable
]).component(PAGE.name, {
	template,
	controllerAs: PAGE.name,
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