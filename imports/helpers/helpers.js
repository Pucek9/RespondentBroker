import moment from 'moment';
import {DATE_MASK} from './constants';

function randomDate() {
	return new Date(Math.floor(Math.random() * new Date()));
}

function randomDateString(dateMask = DATE_MASK) {
	return moment(randomDate()).format(dateMask);
}

function dateNowString(dateMask = DATE_MASK) {
	return moment().format(dateMask);
}

function interpolatedValue($scope, row) {
	return this.interpolateExpr({
		row: row
	});
}

function isOwner(userId, object) {
	return userId && object.owner === userId
}

export {randomDateString, dateNowString, interpolatedValue, isOwner}