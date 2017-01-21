import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './projectsTab.html';
import {Projects} from '../../../api/projects';
import {PROJECTS as PAGE} from '../../../helpers/constants';
import {name as DynamicTable} from '../dynamicTable/dynamicTable';
import {interpolatedValue} from '../../../helpers/helpers';

class Controller {
	constructor($scope, $reactive, $interpolate, $filter) {
		'ngInject';
		$reactive(this).attach($scope);
		this.userId = Meteor.userId();
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.translate = $filter('translate');
		this.helpers({
			projects() {
				return Projects.find({statusActive: true, owner: {$not: this.userId}}, {sort: {name: 1}});
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
				field: "name",
				filter: {name: "text"},
				show: true,
				sortable: "name",
				title: this.translate('PROJECT.NAME'),
				getValue: interpolatedValue,
				interpolateExpr: $interpolate('<a href="projects/{{row._id}}/preview">{{row.name}}</a>')
			},
			{field: "created", filter: {created: "text"}, show: true, sortable: "created", title: this.translate('CREATE_DATE')},
			{field: "updated", filter: {updated: "text"}, show: true, sortable: "updated", title: this.translate('LAST_UPDATE')},
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
			{field: "minPoints", filter: {minPoints: "number"}, show: true, sortable: "minPoints", title: this.translate('MIN_POINTS')},
			{field: "maxPoints", filter: {maxPoints: "number"}, show: true, sortable: "maxPoints", title: this.translate('MAX_POINTS')},
			// {field: "responsesLength", filter: {responsesLength: "number"}, show: true, sortable: "responsesLength", title: "Replies"},
			{
				field: "responses",
				show: true,
				title: this.translate('RESPONSES'),
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
	controller: Controller
})
	.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
		.state(PAGE.name, {
			url: PAGE.url,
			template: PAGE.template,
		});
}