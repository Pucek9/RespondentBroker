import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {upload} from '../../../api/files';
import ngFileUpload from 'ng-file-upload';

import template from './singleFileUpload.html';

class SingleFileUpload {
	constructor($scope, $reactive, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.notification = notification;
		this.$scope = $scope;

		this.uploaded = [];
		this.progress=0;
	}

	addFiles(files) {
		if (files.length) {
			this.currentFile = files[0];
			// console.log('currentFile', this.currentFile);

			const reader = new FileReader;
			reader.onload = this.$bindToContext((e) => {
				this.fileToUpload = e.target.result;
			});
			reader.readAsDataURL(files[0]);
		} else {
			this.fileToUpload = undefined;
		}
	}

	save() {
		upload(this.fileToUpload, this.currentFile.name, this.store, this.$bindToContext((file) => {
			this.uploaded.push(file);
			console.log('got file', file);
			this.file = file.path;
			this.$scope.$apply();
			this.reset();
		}), (e) => {
			this.notification.error('Oops, something went wrong' + e);
			console.log('Oops, something went wrong', e);
		},(file, progress) => {
			this.progress = (progress*100).toFixed();
			this.$scope.$apply();
			}
		)
	}

	reset() {
		this.progress=0;
		this.fileToUpload = undefined;
	}

	isImage() {
		return this.type.split('/')[0] === 'image';
	}

	isApplication() {
		return this.type === '';
	}

	isAudio() {
		return this.type.split('/')[0] === 'audio';
	}

	isText() {
		return this.type.split('/')[0] === 'text';
	}

	isVideo() {
		return this.type.split('/')[0] === 'video';
	}
}

const name = 'singleFileUpload';

// create a module
export default angular.module(name, [
	angularMeteor,
	ngFileUpload,
]).component(name, {
	template,
	controllerAs: name,
	controller: SingleFileUpload,
	bindings: {
		file: '=',
		type: '=',
		store: '=',
		disabled: '='
	},
});