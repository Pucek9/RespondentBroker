import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Meteor} from 'meteor/meteor';
import {Projects} from '../../../api/projects';
import {Responses} from '../../../api/responses';
import {interpolatedValue} from '../../../helpers/helpers';
import {STEP_VIEW as PAGE} from '../../../helpers/constants';
import template from './stepView.html';

class Controller {
	constructor($stateParams, $scope, $reactive, $timeout, $window, $filter, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.translate = $filter('translate');
		this.projectId = $stateParams.projectId;
		this.responseId = $stateParams.responseId;
		this.stepId = $stateParams.stepId;
		this.$timeout = $timeout;
		this.$scope = $scope;
		this.bigScreen = $window.innerWidth >= 768;
		this.notification = notification;
		[this.pageTitle, this.icon] = [PAGE.pageTitle, PAGE.icon];
		// this.isComplete = Responses.findOne({
		// 	_id: this.responseId
		// }).isComplete;

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
				let response = Responses.findOne({
					_id: this.responseId
				});
				if (response) {
					return response.steps[this.stepId];
				}
			},
			addActions() {
				let response = Responses.findOne({
					_id: this.responseId
				});
				if (response) {
					this.actions = response.steps[this.stepId].actions;
					// this.typeMap = this.actions.map(obj => obj.type)
				}
			},

		});

		this.fps = 16;// 16 roughly 60 frames per second
		this.greyRange = 15;
		this.symilarRange = 20;
		this.min = 130;
		this.max = 250;
	}

	isStarted() {
		let typeMap = this.actions.map(obj => obj.type);
		return typeMap.indexOf('start') !== -1;
	};

	isFaulting() {
		let typeMap = this.actions.map(obj => obj.type);
		let occurencesBeginFaultyPath = typeMap.filter(x => x == 'beginFaultyPath').length;
		let occurencesFinishFaultyPath = typeMap.filter(x => x == 'finishFaultyPath').length;
		return (occurencesBeginFaultyPath + occurencesFinishFaultyPath) % 2 == 1;
	};

	isEnd() {
		let typeMap = this.actions.map(obj => obj.type);
		return typeMap.indexOf('end') !== -1;
	}

	isValid() {
		let valid = true;
		let typeMap = this.actions.map(obj => obj.type);
		for (let i = 0; i < typeMap.length - 1; i++) {
			if (typeMap[i] == 'beginFaultyPath') {
				valid = false;
			} else if (typeMap[i] == 'finishFaultyPath') {
				valid = true;
			}
		}
		console.log(typeMap[0] == 'start', typeMap[typeMap.length - 1] == 'end', valid)
		return typeMap[0] == 'start' && typeMap[typeMap.length - 1] == 'end' && valid;
	}


	removeAction(action) {
		let index = this.actions.indexOf(action);
		this.actions.splice(index, 1);
	}

	actionsUpdate() {
		const response = Responses.findOne({
			_id: this.responseId
		});
		if (response) {

			Meteor.call('addActions', response, this.stepId, this.actions, this.step.isComplete, (error) => {
				if (error) {
					console.log(error);
					this.notification.error(this.translate('STEP_UPDATE_UNABLE') + error.message);
				} else {
					this.notification.success(this.translate('STEP_UPDATE_SUCCESS'));
				}
			});
		}
	}

	confirm() {
		if (this.isValid()) {
			this.actionsUpdate();
		}
		else {
			this.notification.error(this.translate('ACTIONS_INVALID'));
		}
	}

	start = () => {
		this.$timeout(() => {
			this.doLoad();
		}, 200);
	};

	isInRange = (b, g, r) => {
		if (b >= this.min && g >= this.min && r >= this.min
			&& b <= this.max && g <= this.max && r <= this.max) {
			if (Math.abs(b - g) < this.greyRange && Math.abs(r - g) < this.greyRange && Math.abs(b - r) < this.greyRange) {
				return true;
			}
		}
		return false;
	};


	isSimilarTo = (el1, el2) => {
		return Math.abs(el1 - el2) < this.symilarRange;
	};


	timerCallback = () => {

		if (this.video.paused || this.video.ended) {
			return;
		}

		this.computeFrame();

		// const self = this;
		setTimeout(() => {
			this.timerCallback();
		}, this.fps);
	};


	doLoad = () => {
		const self = this;
		// this.frameNumber = 0;

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

		this.video.addEventListener("play", () => {
			this.width = this.video.width;
			this.height = this.video.height;
			this.timerCallback();
		}, false);

		this.video.addEventListener("pause", () => {
			let action = {
				time: this.video.currentTime,
				name: '',
				type: ''
			};
			this.actions.push(action);
			this.$scope.$apply();
			// console.log(this.actions)
		}, false);
	};

	computeFrame = () => {
		this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
		let frame = this.ctx1.getImageData(0, 0, this.width, this.height); //płótno kopiujące obraz z filmu
		let l = frame.data.length / 4;

		for (let i = 0; i < l; i++) {
			// pętla przebiegająca po współrzędnych macierzy klatki filmu
			let ir = i * 4;
			let ig = i * 4 + 1;
			let ib = i * 4 + 2;
			// przypisanie do zmiennych składowych wartości koloru pixeli rgb z klatki filmu
			if (typeof this.lastFrame != 'undefined' && typeof this.mixFrame != 'undefined') {
				// sprawdzenie, czy istnieje poprzednia klatka, a więc film już trwa dłużej niż 1 klatka
				this.mixFrame.data[ir] = 0;
				this.mixFrame.data[ig] = 0;
				this.mixFrame.data[ib] = 0;
				// wyczyszczenie obrazu z płótna pomocniczego
				if (this.isSimilarTo(this.lastFrame.data[ir], frame.data[ir])
					&& this.isSimilarTo(this.lastFrame.data[ig], frame.data[ig])
					&& this.isSimilarTo(this.lastFrame.data[ib], frame.data[ib])
				// porównanie składowych kolorów, czy nie różnią się znacząco od siebie
				// return Math.abs(el1 - el2) < this.symilarRange; - gdzie symilarRange - optymalna wartość ustalona na 20
				) {
					this.mixFrame.data[ir] = 255;
					this.mixFrame.data[ig] = 255;
					this.mixFrame.data[ib] = 255;
					// stworzenie maski poprzez zanegowanie koloru tam, gdzie nie występuje znacząca zmiana koloru pixela
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
		// przypisanie klatek docelowym płótnom, tak aby aktualna klatka z maską została wyświetlona, a aktualna stała się poprzednią
		return;
		// kontynuowanie pętli
	};

}

export default angular.module(PAGE.name, [
	angularMeteor,
	uiRouter,
])
	.component(PAGE.name, {
		template,
		controller: Controller,
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