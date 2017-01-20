import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {DASHBOARD as PAGE} from '../../../helpers/constants';
import template from './dashboard.html';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

class Controller {

	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.userId = Meteor.userId();

		this.helpers({
			usersResponded() {
				let users = [];
				let projects = Projects.find({owner: this.userId});
				projects.forEach(function (project) {
					let responses = Responses.find({project: project._id});
					responses.forEach(function (response) {
						if (users.indexOf(response.owner) === -1) {
							users.push(response.owner);
						}
					});
				});
				return users;
			},
			myProjects() {
				return Projects.find({owner: this.userId});
			},
			myProjectsResponses() {
				let responses = [];
				let projects = Projects.find({owner: this.userId});
				projects.forEach(project =>{
					project.responses.forEach(response => {
						responses.push({project: project._id, response: response});
					});
				});
				return responses;
			},
			responsesWithoutPay() {
				let responses = [];
				let projects = Projects.find({owner: this.userId});
				projects.forEach(function (project) {
					let responsesWithoutPay = Responses.find({project: project._id, isPaid: false}).fetch();
					responsesWithoutPay.forEach(function (response) {
						responses.push(response)
					});
				});
				return responses;
			}
		});
	}
}

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,

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