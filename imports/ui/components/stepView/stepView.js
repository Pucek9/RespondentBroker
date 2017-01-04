import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import template from './stepView.html';

class StepView {
	constructor($stateParams, $scope, $reactive, $timeout, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.responseId = $stateParams.responseId;
		this.stepId = $stateParams.stepId;
		this.$timeout = $timeout;
		// this.$state = $state;
		this.notification = notification;

		this.pageTitle = 'Response View';
		this.icon = 'check-square-o';
		this.color = 'yellow';

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
			step() {
				let responses = Responses.findOne({
					_id: this.responseId
				});
				if (responses) {
					console.log(responses.steps[this.stepId])
					return responses.steps[this.stepId];
				}
			}
		});

		this.processor = {

			fps: 16,// 16 roughly 60 frames per second
			greyRange: 15,
			symilarRange: 20,
			min: 130,
			max: 250,

			isInRange: function (b, g, r) {
				if (b >= this.min && g >= this.min && r >= this.min
					&& b <= this.max && g <= this.max && r <= this.max) {
					if (Math.abs(b - g) < this.greyRange && Math.abs(r - g) < this.greyRange && Math.abs(b - r) < this.greyRange) {
						return true;
					}
				}
				return false;
			},

			isSimilarTo: function (el1, el2) {
				return Math.abs(el1 - el2) < this.symilarRange;
			},

			doLoad: function () {
				const self = this;
				this.frameNumber = 0;

				this.video = angular.element(document).find('#video')[0];

				this.c1 = document.createElement("canvas");
				this.c1.id = "c";
				this.ctx1 = this.c1.getContext("2d");
				this.c1.width = 270;
				this.c1.height = 480;

				this.c2 = document.createElement("canvas");
				this.c2.id = "c2";
				this.ctx2 = this.c2.getContext("2d");

				this.c3 = angular.element(document).find('#canvas')[0];
				this.ctx3 = this.c3.getContext("2d");

				this.video.addEventListener("play", function () {
					self.width = self.video.width;
					self.height = self.video.height;
					self.timerCallback();
				}, false);
			},

			timerCallback: function () {

				if (this.video.paused || this.video.ended) {
					return;
				}
				this.computeFrame();

				const self = this;
				setTimeout(function () {
					self.timerCallback();
				}, this.fps);
			},

			computeFrame: function () {

				this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
				let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
				let l = frame.data.length / 4;

				for (let i = 0; i < l; i++) {
					let ir = i * 4;
					let ig = i * 4 + 1;
					let ib = i * 4 + 2;

					if (typeof this.lastFrame != 'undefined' && typeof this.mixFrame != 'undefined') {
						// && this.isInRange(frame.data[ir],frame.data[ig],frame.data[ib])) {
						this.mixFrame.data[ir] = 0;
						this.mixFrame.data[ig] = 0;
						this.mixFrame.data[ib] = 0;

						if (this.isSimilarTo(this.lastFrame.data[ir], frame.data[ir])
							&& this.isSimilarTo(this.lastFrame.data[ig], frame.data[ig])
							&& this.isSimilarTo(this.lastFrame.data[ib], frame.data[ib])
						) {
							// 	if(
							// && this.isInRange(frame.data[ir],frame.data[ig],frame.data[ib])) {
							this.mixFrame.data[ir] = 255;
							this.mixFrame.data[ig] = 255;
							this.mixFrame.data[ib] = 255;
							// }

						}

					}
				}
				this.ctx1.putImageData(frame, 0, 0);

				if (typeof this.lastFrame != 'undefined') {
					this.ctx2.putImageData(this.lastFrame, 0, 0);
					if (typeof this.mixFrame != 'undefined')
						this.ctx3.putImageData(this.mixFrame, 0, 0);
				}
				this.mixFrame = this.lastFrame;
				this.lastFrame = frame;

				// console.log(this.frameNumber)
				this.frameNumber++;
				return;
			}
		};

		this.start = function () {
			this.$timeout(() => {
				this.processor.doLoad();
			}, 200);
		};
	}

}

const name = 'stepView';

// create a module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
]).component(name, {
	template,
	controllerAs: name,
	controller: StepView,
	// bindings: {
	// 	'step': '=',
	// },
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('stepView', {
		url: '/projects/:projectId/responses/:responseId/steps/:stepId',
		template: '<step-view></step-view>',
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