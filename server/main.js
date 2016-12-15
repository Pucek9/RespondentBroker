import {Meteor} from 'meteor/meteor';
import {Projects} from '../imports/api/projects';

import {PROJECTS} from '../imports/helpers/seedData';

Meteor.startup(() => {
	if (Projects.find().count() === 0) {
		const projects = PROJECTS;

		projects.forEach((project) => {
			Projects.insert(project)
		});
	}
});
