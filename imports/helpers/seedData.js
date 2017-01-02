import {randomDateString, dateNowString} from './helpers';

const PROJECTS = [
	{
		name: 'Moroni',
		description: `viverra eros feugiat, eget tempor diam bibendum. Aenean at nibh nec quam feugiat hendrerit id at lectus. Ut tincidunt scelerisque interdum. Curabitur sollicitudin tincidunt quam id facilisis. Aliquam mi velit, molestie in tincidunt eget, aliquet quis odio. Phasellus sed porttitor mi, condimentum egestas tellus.
		
Nullam quis volutpat nunc, vitae imperdiet ex. Praesent placerat lectus id eros interdum sollicitudin nec sed leo. Morbi vel velit viverra, fermentum ipsum ut, dictum sem. In semper nibh vel maximus ornare. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer molestie vitae mauris eget dictum. In suscipit augue ut nisl maximus dapibus. Maecenas maximus vel augue quis pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 9, minPoints: 6,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ'
	},
	{
		name: 'Simon',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'KJhjaeHJdfkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 10, minPoints: 4,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ'
	},
	{
		name: 'Jacob',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'KJhjaeHJdfkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 12, minPoints: 8,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ'
	},
	{
		name: 'Nephi',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'XasjJHsdkjetewbe',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 16, minPoints: 7,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ'
	},
	{
		name: 'Christian',
		description: `Vivamus viverra pharetra mauris eget interdum. Morbi consectetur blandit leo. Phasellus mattis nisl et lectus blandit pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin porttitor augue. Nulla porta mi neque. Maecenas facilisis eu nibh nec commodo. Suspendisse ullamcorper tempor ipsum, id sagittis lorem efficitur non. Nam id varius eros. In egestas pulvinar urna, nec egestas turpis malesuada vel. Nulla lacinia venenatis enim ac dignissim.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 12, minPoints: 9,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ'
	},
	{
		name: 'Tiancum',
		description: `todo`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 18, minPoints: 3,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ'
	},
	{
		name: 'Jacob',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque. Nullam viverra, enim nec consectetur laoreet, augue sem sagittis risus, ut finibus leo magna et odio. Suspendisse potenti. In convallis euismod dolor vitae mollis. Praesent id interdum libero, at vehicula libero.

Vivamus viverra pharetra mauris eget interdum. Morbi consectetur blandit leo. Phasellus mattis nisl et lectus blandit pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin porttitor augue. Nulla porta mi neque. Maecenas facilisis eu nibh nec commodo. Suspendisse ullamcorper tempor ipsum, id sagittis lorem efficitur non. Nam id varius eros. In egestas pulvinar urna, nec egestas turpis malesuada vel. Nulla lacinia venenatis enim ac dignissim.

Proin convallis nunc at justo sodales aliquam. Aliquam ullamcorper ligula ligula, in rhoncus elit congue eu. Vivamus facilisis commodo magna. Suspendisse potenti. Morbi sit amet risus ac turpis auctor ultricies. Duis dui lorem, tincidunt ac odio eget, aliquam pulvinar metus. Vivamus id dolor a quam porttitor posuere.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 10, minPoints: 2,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ'
	}
];


const RESPONSES = [
	{
		owner: "9X285yQzusTQwteYv",
		project: "3P3DpFLCp6ubrTC54",
		isPaid: false,
		steps: [{
			movieTag: "First Task",
			movieURL: "/screen.m4v",
			rating: 4,
			description: 'was nice'
		}]
	}
];

export {PROJECTS, RESPONSES}