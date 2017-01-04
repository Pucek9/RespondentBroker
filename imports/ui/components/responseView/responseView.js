import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import template from './responseView.html';

class ResponseView {
	constructor($stateParams, $scope, $reactive, $timeout, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.responseId = $stateParams.responseId;
		this.$timeout = $timeout;
		// this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Response View';
		this.icon = 'check-square-o';
		this.color = 'yellow';

		this.points = 1;

		this.helpers({
			project() {
				return Projects.findOne({
					_id: this.projectId
				});
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

	validatePoints() {
		let project = Projects.findOne({
			_id: this.projectId
		});
		if (this.points >= project.minPoints && this.points <= project.maxPoints) {
			return true;
		} else {
			this.notification.error(`You set points not in range ${project.minPoints}-${project.maxPoints}. Change value.`);
			return false;
		}
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

	submit() {
		let response = Responses.findOne({
			_id: this.responseId
		});

		if (response && this.validatePoints()) {
			let owner = Meteor.users.findOne({
				_id: response.owner
			});
			console.log(this.points);
			Meteor.users.update({
				_id: owner._id
			}, {
				$inc: {
					'profile.points': this.points,
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
	}

	//
	// $onInit() {
	// 	let p = Projects.findOne({
	// 		_id: this.projectId
	// 	});
	// 	if (this.p) {this.points = p.minPoints;}
	// }
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
		// resolve: {
		// 	currentUser($q) {
		// 		if (Meteor.userId() === null) {
		// 			return $q.reject('AUTH_REQUIRED');
		// 		} else {
		// 			return $q.resolve();
		// 		}
		// 	}
		// }
	});
}