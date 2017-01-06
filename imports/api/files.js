import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {UploadFS} from 'meteor/jalik:ufs';

function loggedIn(userId) {
	return !!userId;
}

const Images = new Mongo.Collection('images');

export const ImagesStore = new UploadFS.store.GridFS({
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
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
export function upload(dataUrl, name, resolve, reject) {
	const blob = dataURLToBlob(dataUrl);
	blob.name = name;
	const file = _.pick(blob, 'name', 'type', 'size');
	const upload = new UploadFS.Uploader({
		data: blob,
		file: file,
		store: ImagesStore,
		onError: reject,
		onComplete: resolve
	});
	upload.start();
}

export {Images, dataURLToBlob, upload}