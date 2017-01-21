import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';
import {VideosStore} from '../../../api/files';
import {name as SingleFileUpload} from '../upload/singleFileUpload';
import {UploadFS} from 'meteor/jalik:ufs';
import {PROJECT_PREVIEW as PAGE} from '../../../helpers/constants';
import template from './projectPreview.html';

class Controller {
	constructor($stateParams, $scope, $reactive, $state, $window, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.$state = $state;
		this.notification = notification;
		this.VideosStore = VideosStore;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];

		this.screenHeight = $window.innerHeight;

		this.response = {};
		this.response.steps = [];
		this.importTab = false;
		this.uploadTab = true;

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
			backState() {
				let project = this.getCurrentProject();
				if (project) {
					if (Meteor.userId() === project.owner) {
						return 'projects/my';
					}
					else if (!project.statusActive) {
						return 'projects/archive';
					}
					else {
						return 'projects';
					}
				}
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
		});
	}

	chooseTab(tab) {
		this.uploadTab = false;
		this.importTab = false;
		this[tab] = true;
	}

	callback(error, response) {
		if (error) {
			console.log('error', error.message);
			this.notification.error('Problem with upload files.', error.message);
		}
		else {
			this.projectPreview.temp.videoURL = response.path;
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

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
	SingleFileUpload
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