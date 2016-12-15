import {Meteor} from 'meteor/meteor';
import {Projects} from '../imports/api/projects';
import moment from 'moment';
import DATE_MASK from '../imports/helpers/constants';

function randomDate() {
	return new Date(Math.floor(Math.random() * new Date()));
}

function randomDateString() {
	return moment(randomDate()).format(DATE_MASK);
}

function dateNow() {
	return moment().format(DATE_MASK);
}

Meteor.startup(() => {
	if (Projects.find().count() === 0) {
		const projects = [
			{projectName: 'Moroni', responses: 50, createDate: randomDateString(), updateDate: dateNow(), owner: 'RtfTEHK5scrkRZcch'},
			{projectName: 'Simon', responses: 43, createDate: randomDateString(), updateDate: dateNow(), owner: 'KJhjaeHJdfkRZcch'},
			{projectName: 'Jacob', responses: 27, createDate: randomDateString(), updateDate: dateNow(), owner: 'KJhjaeHJdfkRZcch'},
			{projectName: 'Nephi', responses: 29, createDate: randomDateString(), updateDate: dateNow(), owner: 'XasjJHsdkjetewbe'},
			{projectName: 'Christian', responses: 34, createDate: randomDateString(), updateDate: dateNow(), owner: 'RtfTEHK5scrkRZcch'},
			{projectName: 'Tiancum', responses: 3, createDate: randomDateString(), updateDate: dateNow(), owner: 'RtfTEHK5scrkRZcch'},
			{projectName: 'Jacob', responses: 27, createDate: randomDateString(), updateDate: dateNow(), owner: 'RtfTEHK5scrkRZcch'}
		];

		projects.forEach((project) => {
			Projects.insert(project)
		});
	}
});
