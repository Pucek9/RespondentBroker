import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');

Projects.allow({
	insert(userId, project) {
		return userId && project.owner === userId;
	},
	update(userId, project, fields, modifier) {
		return userId && project.owner === userId;
	},
	remove(userId, project) {
		return userId && project.owner === userId;
	}
});