import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import ngFileUpload from 'ng-file-upload';

import template from './singleFileUpload.html';
import {ImagesStore, upload} from '../../../api/files';

class SingleFileUpload {
	constructor($scope, $reactive, notification) {
		'ngInject';
		$reactive(this).attach($scope);
		this.notification = notification;
		this.$scope = $scope;
		this.uploaded = [];
	}

	addFiles(files) {
		if (files.length) {
			this.currentFile = files[0];
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
		upload(this.fileToUpload, this.currentFile.name, ImagesStore, this.$bindToContext((file) => {
			this.uploaded.push(file);
			console.log('got file', file);
			this.file = file.path;
			this.$scope.$apply();
			this.reset();
		}), (e) => {
			this.notification.error('Oops, something went wrong' + e);
			console.log('Oops, something went wrong', e);
		});
	}

	reset() {
		this.fileToUpload = undefined;
	}

	isImage() {
		return this.type.split('/')[0] === 'image';
	}

	isApplication() {
		return this.type.split('/')[0] === 'application';
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
		type: '='
	},
});