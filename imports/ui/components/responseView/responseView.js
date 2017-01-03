import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';

import {interpolatedValue} from '../../../helpers/helpers';
import template from './responseView.html';

class ResponseView {
	constructor($stateParams, $scope, $reactive, $state, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.projectId = $stateParams.projectId;
		this.responseId = $stateParams.responseId;
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
			// steps() {
			// 	let responses = Responses.findOne({
			// 		_id: this.responseId
			// 	});
			// 	if (responses) {
			// 		return responses.steps;
			// 	}
			// }
		});

		this.processor = {

			fps: 16,// 16 roughly 60 frames per second
			greyRange: 15,
			symilarRange: 20,
			min :130,
			max: 250,

			isInRange: function(b,g,r) {
				if (b >= this.min && g >= this.min && r >= this.min
					&& b <= this.max && g <= this.max && r <= this.max) {
					// console.log('out')
					if (Math.abs(b-g) < this.greyRange && Math.abs(r-g) < this.greyRange && Math.abs(b-r) < this.greyRange) {
						return true;
					}
				}
				return false;
			},

			isSimilarTo: function (el1, el2) {
				return Math.abs(el1-el2)<this.symilarRange;
			},

			doLoad: function() {
				var self = this;
				this.frameNumber = 0;

				// this.video = document.getElementById("video0");
				this.video = angular.element(document).find('#video0')[0];
				console.log(this.video)
				// this.c1 = document.getElementById("c");
				this.c1 = document.createElement("canvas");
				this.c1.id = "c";
				this.ctx1 = this.c1.getContext("2d");
				this.c1.width = 540;
				this.c1.height = 960;

				// this.c2 = document.getElementById("c2");
				this.c2 = document.createElement("canvas");
				this.c2.id = "c2";
				this.ctx2 = this.c2.getContext("2d");

				this.c3 = angular.element(document).find('#canvas0')[0];
				console.log(this.c3)
				this.ctx3 = this.c3.getContext("2d");

				this.video.addEventListener("play", function() {
					self.width = self.video.width;
					self.height = self.video.height;
					self.timerCallback();
				}, false);
			},

			timerCallback: function() {
				//
				// if (this.video.paused) {
				// this.drawSomething();
				// }

				if (this.video.paused || this.video.ended) {
					return;
				}
				this.computeFrame();

				var self = this;
				setTimeout(function () {
					self.timerCallback();
				}, this.fps);
			},

			computeFrame: function() {

				this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
				var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
				var l = frame.data.length / 4;

				for (var i = 0; i < l; i++) {
					var ir = i * 4 + 0;
					var ig = i * 4 + 1;
					var ib = i * 4 + 2;

					// var grey = (frame.data[ir] + frame.data[ig] + frame.data[ib]) / 3;
					// frame.data[ir] = grey;
					// frame.data[ig] = grey;
					// frame.data[ib] = grey;

					if (typeof this.lastFrame != 'undefined' && typeof this.mixFrame != 'undefined' ) {
						// && this.isInRange(frame.data[ir],frame.data[ig],frame.data[ib])) {
						this.mixFrame.data[ir] = 0;
						this.mixFrame.data[ig] = 0;
						this.mixFrame.data[ib] = 0;

						if ( this.isSimilarTo(this.lastFrame.data[ir],frame.data[ir])
							&& this.isSimilarTo(this.lastFrame.data[ig],frame.data[ig])
							&& this.isSimilarTo(this.lastFrame.data[ib],frame.data[ib])
						){
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

		// this.processor.doLoad();
	}

$onInit() {
	// this.processor.doLoad();
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