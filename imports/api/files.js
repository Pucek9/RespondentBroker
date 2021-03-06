import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {UploadFS} from 'meteor/jalik:ufs';

function loggedIn(userId) {
	return !!userId;
}

function isFromURL(userId, file) {
	// Check if the file is imported from a URL
	if (typeof file.originalUrl === 'string') {
		return true;
	}
}

const Images = new Mongo.Collection('images');
const ImagesStore = new UploadFS.store.GridFS({
	collection: Images,
	name: 'images',
	filter: new UploadFS.Filter({
		contentTypes: ['image/*']
	}),
	permissions: new UploadFS.StorePermissions({
		insert: loggedIn,
		update: loggedIn,
		remove: loggedIn
	})
});

const Videos = new Mongo.Collection('videos');
const VideosStore = new UploadFS.store.GridFS({
	collection: Videos,
	name: 'videos',
	// filter: new UploadFS.Filter({
	// 	contentTypes: ['video/*']
	// }),
	permissions: new UploadFS.StorePermissions({

		insert: function(userId, file) {
			return loggedIn(userId) || isFromURL(userId, file);
		},
		update: loggedIn,
		remove: loggedIn
	})
});

const Applications = new Mongo.Collection('applications');
const ApplicationsStore = new UploadFS.store.GridFS({
	collection: Applications,
	name: 'applications',
	filter: new UploadFS.Filter({
		contentTypes: ['application/*']
	}),
	permissions: new UploadFS.StorePermissions({
		insert: loggedIn,
		update: loggedIn,
		remove: loggedIn
	})
});


/**
 * Converts DataURL to Blob object
 *
 * https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
 *
 * @param  {String} dataURL
 * @return {Blob}
 */
function dataURLToBlob(dataURL) {
	const BASE64_MARKER = ';base64,';

	if (dataURL.indexOf(BASE64_MARKER) === -1) {
		const parts = dataURL.split(',');
		const contentType = parts[0].split(':')[1];
		const raw = decodeURIComponent(parts[1]);

		return new Blob([raw], {type: contentType});
	}

	const parts = dataURL.split(BASE64_MARKER);
	const contentType = parts[0].split(':')[1];
	const raw = window.atob(parts[1]);
	const rawLength = raw.length;
	const uInt8Array = new Uint8Array(rawLength);

	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], {type: contentType});
}

/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {function}   store    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
function upload(dataUrl, name, store, resolve, reject, progress) {

	const blob = dataURLToBlob(dataUrl);
	blob.name = name;
	const file = _.pick(blob, 'name', 'type', 'size');
	console.log('file,',file, store);
	const upload = new UploadFS.Uploader({
		data: blob,
		file: file,
		store: store,
		onError: reject,
		onComplete: resolve,
		onProgress: progress
	});
	upload.start();
}

export {Images, ImagesStore, Videos, VideosStore, Applications, ApplicationsStore, upload}