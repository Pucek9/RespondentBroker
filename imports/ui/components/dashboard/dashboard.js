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
		[this.pageTitle,this.icon] = [PAGE.pageTitle, PAGE.icon];
		this.userId = Meteor.userId();

		this.helpers({
			users() {
				return Meteor.users.find({});
			},
			myProjects() {
				return Projects.find({owner: this.userId});
			},
			myProjectsResponses() {
				let sum=0;
				let projects = Projects.find({owner: this.userId});
				projects.forEach(function(project){
					sum = sum + project.responses.length;
				});
				return sum;
			},
			responsesWithoutPay() {
				let sum=0;
				let projects = Projects.find({owner: this.userId});
				projects.forEach(function(project){
					let responses = Responses.find({project: project._id, isPaid: false}).fetch();
					console.log(responses)
					sum = sum + responses.length
				});
				return sum;
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