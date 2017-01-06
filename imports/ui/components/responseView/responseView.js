import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import template from './responseView.html';

class ResponseView {
	constructor($stateParams, $scope, $reactive, $timeout, notification, validator) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.responseId = $stateParams.responseId;
		this.$timeout = $timeout;
		this.notification = notification;
		this.validator = validator;

		this.pageTitle = 'Response View';
		this.icon = 'check-square-o';
		this.color = 'yellow';

		this.helpers({
			project() {
				let p = Projects.findOne({
					_id: this.projectId
				});
				if (p) {
					this.points = p.minPoints;
					return p;}

			},
			response() {
				return Responses.findOne({
					_id: this.responseId
				})
			},
			owner() {
				let response = Responses.findOne({
					_id: this.responseId
				});
				if (response) {
					return Meteor.users.findOne({
						_id: response.owner
					})
				}
			}
		});
	}



	setPaid(response) {
		Responses.update({
			_id: response._id
		}, {
			$set: {
				isPaid: true,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to set Paid this response... Error: ' + error.message);
			} else {
				this.notification.success('Your points was added successfully!');
			}

		});
	}

	payForUser(response) {
		let owner = Meteor.users.findOne({
			_id: response.owner
		});
		Meteor.users.update({
			_id: owner._id
		}, {
			$inc: {
				'profile.points': this.points,
				'profile.level': 1,
			}
		}, (error) => {
			if (error) {
				this.notification.error('Oops, unable to add poitns for User... Error: ' + error.message);
				console.log(error);
			} else {
				this.setPaid(response);
			}
		});
	}

	submit() {
		const response = Responses.findOne({
			_id: this.responseId
		});
		const project = Projects.findOne({
			_id: this.projectId
		});
		if (this.validator.payPoints(project, this.points)) {
			this.payForUser(response);
		}
	}

}

const name = 'responseView';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template,
	controllerAs: name,
	controller: ResponseView
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('responseView', {
		url: '/projects/:projectId/responses/:responseId',
		template: '<response-view></response-view>',
		resolve: {
			currentUser($q) {
				if (Meteor.userId() === null) {
					return $q.reject('AUTH_REQUIRED');
				} else {
					return $q.resolve();
				}
			}
		}
	});
}