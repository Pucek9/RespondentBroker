import moment from 'moment';
import DATE_MASK from './constants';

function randomDate() {
	return new Date(Math.floor(Math.random() * new Date()));
}

function randomDateString() {
	return moment(randomDate()).format(DATE_MASK);
}

function dateNowString() {
	return moment().format(DATE_MASK);
}

export {randomDateString, dateNowString}