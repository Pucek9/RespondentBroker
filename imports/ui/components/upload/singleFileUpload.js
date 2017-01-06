import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
// import 'ng-img-crop/compile/minified/ng-img-crop';
// import 'ng-img-crop/compile/minified/ng-img-crop.css';


import { Meteor } from 'meteor/meteor';

import template from './singleFileUpload.html';
import { upload } from '../../../api/files';


class SingleFileUpload {
	constructor($scope, $reactive) {
		'ngInject';
		$reactive(this).attach($scope);
		this.uploaded = [];
	}

	addImages(files) {
		// console.log(files)
		if (files.length) {
			this.currentFile = files[0];

			const reader = new FileReader;
			reader.onload = this.$bindToContext((e) => {
				this.imageToUpload = e.target.result;
			});

			reader.readAsDataURL(files[0]);
		} else {
			this.imageToUpload = undefined;
		}
	}

	save() {
		upload(this.imageToUpload, this.currentFile.name, this.$bindToContext((file) => {
			this.uploaded.push(file);
			console.log('got file',file);
			this.file = file.path;

			this.reset();
		}), (e) => {
			console.log('Oops, something went wrong', e);
		});
	}

	reset() {
		this.imageToUpload = undefined;
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
		file: '='
	},
});