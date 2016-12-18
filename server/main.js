import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {Projects} from '../imports/api/projects';

import {PROJECTS} from '../imports/helpers/seedData';

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

	Meteor.users.allow({
		update: ownsDocument
	});

	Accounts.onCreateUser(function (options, user) {
		user.profile = {
			name: 'User',
			forName: '',
			avatar: 'http://www.w3schools.com/w3images/avatar2.png',
			responses: [],
			level: 0,
			points: 0,
		};
		console.log('Registered new user: ', user);
		return user;
	});

});
