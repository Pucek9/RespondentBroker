import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {Projects} from '../imports/api/projects';
import {Responses} from '../imports/api/responses';
import {Images} from'../imports/api/files';

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
