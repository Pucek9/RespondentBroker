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

	//
	// if (Projects.find().count() === 0) {
	// 	const projects = PROJECTS;
	//
	// 	projects.forEach((project) => {
	// 		Projects.insert(project)
	// 	});
	// }
	//
	// if (Responses.find().count() === 0) {
	// 	const responses = RESPONSES;
	//
	// 	responses.forEach((response) => {
	// 		Responses.insert(response)
	// 	});
	// }

	Meteor.users.allow({
		update: allowUpdate
	});

	Meteor.methods({
		addActions: function (response, stepId, actions, isComplete) {
			console.log(response.steps[stepId].tag, actions);
			Responses.update({
				_id: response._id, 'steps.tag': response.steps[stepId].tag
			}, {
				$set: {
					'steps.$.isComplete': isComplete,
					'steps.$.actions':  actions
				}
			}, function (error, affectedDocs) {
				if (error) {
					throw new Meteor.Error(500, error.message);
				} else {
					return "Update Successful";
				}
			});
		}
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
			language: 'en',
			gender: '',
			'birthDate': '',
			education: ''
		};
		console.log('Registered new user: ', user);
		return user;
	});

});
