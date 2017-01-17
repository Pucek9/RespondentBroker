import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';
import {VideosStore} from '../../../api/files';
import {name as SingleFileUpload} from '../upload/singleFileUpload';
import {UploadFS} from 'meteor/jalik:ufs';

import {interpolatedValue} from '../../../helpers/helpers';
import template from './projectDetails.html';

class ProjectDetails {
	constructor($stateParams, $scope, $reactive, $state, $interpolate, $window, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;
		this.VideosStore = VideosStore;

		this.pageTitle = 'Project details';
		this.icon = 'check-square-o';
		this.screenHeight = $window.innerHeight;

		this.response = {};
		this.response.steps = [];
		this.importTab = true;
		this.uploadTab = false;
		this.tip = false;

		this.getCurrentProject = () => {
			return Projects.findOne({_id: this.projectId});
		};

		this.canReply = () => {
			let project = this.getCurrentProject();
			let responses = Responses.find({project: this.projectId, owner: Meteor.userId()}).fetch();
			if (project && responses) {
				return Meteor.userId() !== project.owner && (responses.length === 0 || project.multipleResponses) && project.statusActive;
			}
		};

		this.helpers({
			project() {
				return this.getCurrentProject();
			},
			isStepRating() {
				let project = this.getCurrentProject();
				if (project) {
					return project.isStepRating;
				}
			},
			isStatusActive() {
				let project = this.getCurrentProject();
				if (project) {
					return project.statusActive;
				}
			},
			isStepDescription() {
				let project = this.getCurrentProject();
				if (project) {
					return project.isStepDescription;
				}
			},
			isMyProject() {
				let project = this.getCurrentProject();
				if (project) {
					return Meteor.userId() === project.owner;
				}
			},
			// responses() {
			// 	return Responses.find({project: this.projectId});
			// },
			responses() {
				let responses = Responses.find({project: this.projectId}).fetch();
				if (responses) {
					let users = Meteor.users.find({})
					responses.forEach((r, index, responsesArray) => {
						users.forEach((u) => {
							if (r.owner === u._id) {
								responsesArray[index].ownerName = u.profile.name + ' ' + u.profile.forName;
							}
						});
					});
					return responses;
				}
			},
			isResponsed() {
				return Responses.find({project: this.projectId, owner: Meteor.userId()});
			},
			canResponse() {
				let responses = Responses.find({project: this.projectId, owner: Meteor.userId()}).fetch();
				let project = this.getCurrentProject();
				if (responses && project) {
					return responses.length === 0 || project.multipleResponses;
				}
			},
			isEnabled() {
				return this.canReply();
			},
			ownerFullname() {

			},
			color() {
				return (this.canReply()) ? 'green' : 'yellow';
			}

		});

		this.columns = [
			{field: "_id", filter: {_id: "text"}, show: false, sortable: "_id", title: "_id"},
			{
				field: "_id",
				show: true,
				title: "Actions",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="projects/{{row.project}}/responses/{{row._id}}">View</a>`),
			},
			{
				field: "ownerName",
				show: true,
				title: "Presented",
				sortable: "ownerName",
				filter: {ownerName: "text"},
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`<a href="users/{{row.owner}}/details">{{row.ownerName}}</a>`),
			},
			{
				field: "steps",
				show: true,
				title: "Steps",
				sortable: "steps.length",
				getValue: interpolatedValue,
				interpolateExpr: $interpolate(`{{row.steps.length}}`)
			},
			{field: "isPaid", filter: {isPaid: "text"}, show: true, sortable: "isPaid", title: "Is paid"},
		];
	}

	chooseTab(tab) {
		this.uploadTab = false;
		this.importTab = false;
		this[tab] = true;
	}

	tipToggleSlide() {
		this.tip = !this.tip;
	}

	callback(error, response) {
		if (error) {
			console.log('error', error.message);
			this.notification.error('Problem with upload files.', error.message);
		}
		else {
			this.projectDetails.temp.videoURL = response.path;
		}
	}

	importFromURL() {
		let attr = {name: 'importFromURL.m4v', description: 'Video imported from url'};
		UploadFS.importFromURL(this.temp.videoImportURL, attr, this.VideosStore, this.$bindToContext(this.callback));
	}

	reset() {
		this.temp = {};
	}

	remove(step) {
		let index = this.response.steps.indexOf(step);
		this.response.steps.splice(index, 1);
	}

	addNew() {
		this.response.steps.push({
			tag: this.temp.tag,
			videoURL: this.temp.videoURL,
			stars: this.temp.stars,
			description: this.temp.description,
			actions: []
		});
		this.reset();
	}

	checkAndDeactivateProject() {
		let success = () => {
			this.notification.success('Your response was updated successfully!');
			this.$state.go('projects');
		};
		let project = Projects.findOne({_id: this.projectId});
		if (project) {
			let status = project.autoDeactivate && project.responses.length + 1 >= project.autoDeactivateCount;
			Projects.update({
				_id: this.project._id
			}, {
				$set: {
					statusActive: !status,
				},
			}, (error) => {
				if (error) {
					this.notification.error('There is problem with update project! ' + error.message);
					console.log(error)
				} else {
					success()
				}
			});
		} else {
			success()
		}
	}

	addToUser(id) {
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$push: {
				'profile.responses': id,
			}
		}, (error) => {
			if (error) {
				this.notification.error('There is problem with add your response to user! Error: ' + error);
			} else {
				this.checkAndDeactivateProject();
			}
		});
	}

	addToProject(id) {
		Projects.update({
			_id: this.project._id
		}, {
			$push: {
				responses: id,
			}
		}, (error) => {
			if (error) {
				this.notification.error('There is problem with add your response to project! ' + error.message);
				console.log(error)
			} else {
				this.addToUser(id);

			}
		});
	}

	confirm() {
		this.response.owner = Meteor.userId();
		this.response.project = this.projectId;
		this.response.isPaid = false;
		Responses.insert(angular.copy(this.response),
			(error, id) => {
				if (error) {
					this.notification.error('There is problem with add your response! ' + error);
				}
				else {
					this.addToProject(id);
				}
			}
		);

	}

}

const name = 'projectDetails';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	SingleFileUpload
]).component(name, {
	template,
	controllerAs: name,
	controller: ProjectDetails
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('projectDetails', {
		url: '/projects/:projectId/details',
		template: '<project-details></project-details>',
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