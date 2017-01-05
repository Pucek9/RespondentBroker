import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';

import template from './projectsTab.html';
import {Projects} from '../../../api/projects';

import {name as DynamicTable} from '../dynamicTable/dynamicTable';
import {interpolatedValue} from '../../../helpers/helpers';

class ProjectsTab {
	constructor($scope, $reactive, $interpolate) {
		'ngInject';
		$reactive(this).attach($scope);
		this.pageTitle = 'Projects ';
		this.icon = 'search';
		this.color = 'yellow';

		this.helpers({
			projects() {
				return Projects.find({});
			},
			// projects() {
			// 	let projects = Projects.find({}).fetch();
			// 	if (projects) {
			// 		let users = Meteor.users.find({});
			// 		projects.forEach((p, index, projectsArray) => {
			// 			// projectsArray[index].responsesLength = p.responses.length;
			// 			users.forEach((u) => {
			// 				if (p.owner === u._id) {
			// 					projectsArray[index].ownerName = u.profile.name + ' ' + u.profile.forName;
			// 				}
			// 			});
			// 		});
			// 		return projects;
			// 	}
			// },
		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "name", filter: {name: "text"}, show: true, sortable: "name", title: "Project Name",
				getValue: interpolatedValue, interpolateExpr: $interpolate('<a href="projects/{{row._id}}/details">{{row.name}}</a>')
			},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: "Created"},
			{field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: "Updated"},
			{field: "owner", filter: {owner: "text"}, show: false, sortable: "owner", title: "Owner"},
			// {
			// 	field: "ownerName",
			// 	show: true,
			// 	title: "Owner",
			// 	sortable: "ownerName",
			// 	filter: {ownerName: "text"},
			// 	getValue: interpolatedValue,
			// 	interpolateExpr: $interpolate(`<a href="users/{{row.owner}}/details">{{row.ownerName}}</a>`),
			// },
			{field: "minPoints", filter: {minPoints: "number"}, show: true, sortable: "minPoints", title: "Min points"},
			{field: "maxPoints", filter: {maxPoints: "number"}, show: true, sortable: "maxPoints", title: "Max points"},
			// {field: "responsesLength", filter: {responsesLength: "number"}, show: true, sortable: "responsesLength", title: "Replies"},
			{
				field: "responses",
				show: true,
				title: "Replies",
				sortable: "responses.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.responses.length}}`)
			},
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