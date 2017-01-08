import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {Projects} from '../imports/api/projects';
import {Responses} from '../imports/api/responses';
import {Images, Videos, Applications} from'../imports/api/files';
import {UploadFS} from 'meteor/jalik:ufs';

import {PROJECTS, RESPONSES} from '../imports/helpers/seedData';

ownsDocument = function (userId, doc) {
	return doc && doc._id === userId;
};

points = function (userId, doc, fields, modifier) {
	if (modifier.$inc !== undefined) {
		return Object.keys(modifier.$inc)[0] === 'profile.points' && Object.keys(modifier.$inc)[1] === 'profile.level'
	} else {
		return false;
	}
};

allowUpdate = function (userId, doc, fields, modifier) {
	return ownsDocument(userId, doc) || points(userId, doc, fields, modifier);
};

Meteor.startup(() => {

	UploadFS.config.defaultStorePermissions = new UploadFS.StorePermissions({
		insert: function (userId, doc) {
			return userId;
		},
		update: function (userId, doc) {
			return userId === doc.userId;
		},
		remove: function (userId, doc) {
			return userId === doc.userId;
		}
	});

// Use HTTPS in URLs
	UploadFS.config.https = true;
//
// // Activate simulation for slowing file reading
// 	UploadFS.config.simulateReadDelay = 1000; // 1 sec
//
// // Activate simulation for slowing file uploading
// 	UploadFS.config.simulateUploadSpeed = 128000; // 128kb/s

// Activate simulation for slowing file writing
// 	UploadFS.config.simulateWriteDelay = 2000; // 2 sec
//
// // This path will be appended to the site URL, be sure to not put a "/" as first character
// // for example, a PNG file with the _id 12345 in the "photos" store will be available via this URL :
// // http://www.yourdomain.com/uploads/photos/12345.png
	UploadFS.config.storesPath = 'ufs';

// Set the temporary directory where uploading files will be saved
// before sent to the store.
	UploadFS.config.tmpDir = '/tmp/ufs';
//
// // Set the temporary directory permissions.
	UploadFS.config.tmpDirPermissions = '0700';

	if (Projects.find().count() === 0) {
		const projects = PROJECTS;

		projects.forEach((project) => {
			Projects.insert(project)
		});
	}

	if (Responses.find().count() === 0) {
		const responses = RESPONSES;

		responses.forEach((response) => {
			Responses.insert(response)
		});
	}

	Meteor.users.allow({
		update: allowUpdate
	});

	Accounts.onCreateUser(function (options, user) {
		user.profile = {
			email: user.emails[0].address,
			name: 'User',
			forName: '',
			avatar: '/images/avatar2.png',
			responses: [],
			level: 0,
			points: 1,
		};
		console.log('Registered new user: ', user);
		return user;
	});

});
