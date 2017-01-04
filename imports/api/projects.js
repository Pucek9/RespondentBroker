import {Mongo} from 'meteor/mongo';
export const Projects = new Mongo.Collection('projects');
import {isOwner} from '../helpers/helpers.js';

Projects.allow({
	insert(userId, object) {
		return isOwner(userId, object);
	},
	update(userId, object, fields, modifier) {
		if (userId) {
			if (fields == 'responses') {return true;}
			else {
				return isOwner(userId, object);
			}
		};

	},
	remove(userId, object) {
		return isOwner(userId, object);
	}
});