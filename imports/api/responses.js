import {Mongo} from 'meteor/mongo';
export const Responses = new Mongo.Collection('responses');
import {isOwner} from '../helpers/helpers.js';

isPaidUpdate = function (fields) {
	return fields[0] == 'isPaid';
};

Responses.allow({
	insert(userId, object) {
		return isOwner(userId, object);
	},
	update(userId, object, fields, modifier) {
		return isOwner(userId, object) || isPaidUpdate(fields);
	},
	remove(userId, object) {
		return isOwner(userId, object);
	}
});