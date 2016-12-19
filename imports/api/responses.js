import { Mongo } from 'meteor/mongo';

export const Responses = new Mongo.Collection('responses');

Responses.allow({
	insert(userId, response) {
		return userId && response.owner === userId;
	},
	update(userId, response, fields, modifier) {
		return userId && response.owner === userId;
	},
	remove(userId, response) {
		return userId && response.owner === userId;
	}
});