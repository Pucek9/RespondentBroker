import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {Projects} from '../imports/api/projects';
import {Responses} from '../imports/api/responses';

import {PROJECTS, RESPONSES} from '../imports/helpers/seedData';

ownsDocument = function (userId, doc) {
	console.log('ownsDocument: ',doc && doc._id === userId);
	return doc && doc._id === userId;
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
		update: ownsDocument
	});

	Accounts.onCreateUser(function (options, user) {
		user.profile = {
			email: user.emails[0].address,
			name: 'User',
			forName: '',
			avatar: '/images/avatar2.png',
			responses: [],
			level: 0,
			points: 0,
		};
		console.log('Registered new user: ', user);
		return user;
	});

});
