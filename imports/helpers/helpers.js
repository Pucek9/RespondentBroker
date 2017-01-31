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

function getAge(dateString) {
	let today = new Date();
	let birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

function getAgeRange(dateString) {
	let age = getAge(dateString);

	if (age < 20) {
		return '< 20'
	}
	else if (age >= 20 && age <= 35) {
		return '20-35';
	}
	else if (age >= 36 && age <= 55) {
		return '36-55';
	}
	else if (age > 55) {
		return '55 <';
	}
}

function interpolatedValue($scope, row) {
	return this.interpolateExpr({
		row: row
	});
}

function isOwner(userId, object) {
	return userId && object.owner === userId
}

export {randomDateString, dateNowString, getAge, getAgeRange, interpolatedValue, isOwner}