const DATE_MASK = 'YYYY/MM/DD HH:mm';

const ABOUT = {
	pageTitle: 'ABOUT.TITLE',
	icon: 'info-circle',
	color: 'yellow',
	name: 'about',
	url: '/about',
	template: '<about></about>'
};

const DASHBOARD = {
	pageTitle: 'DASHBOARD.TITLE',
	icon: 'line-chart',
	color: 'yellow',
	name: 'dashboard',
	url: '/dashboard',
	template: '<dashboard></dashboard>'
};

const PROJECTS_ARCHIVE = {
	pageTitle: 'PROJECT.ARCHIVE.TITLE',
	icon: 'history',
	color: 'yellow',
	name: 'projectsArchive',
	url: '/projects/archive',
	template: '<projects-archive></projects-archive>'
};


const PROJECTS_MY = {
	pageTitle: 'PROJECT.MY.TITLE',
	icon: 'dashboard',
	color: 'blue',
	name: 'projectsMy',
	url: '/projects/my',
	template: '<projects-my></projects-my>'
};

const PROJECT_ADD = {
	pageTitle: 'PROJECT.ADD.TITLE',
	icon: 'plus-circle',
	color: 'green',
	name: 'projectAdd',
	url: '/projects/new',
	template: '<project-add></project-add>'
};

const PROJECT_DETAILS = {
	pageTitle: 'PROJECT.DETAILS.TITLE',
	icon: 'line-chart',
	color: 'yellow',
	name: 'projectDetails',
	url: '/projects/:projectId/details',
	template: '<project-details></project-details>'
};

const PROJECT_EDIT = {
	pageTitle: 'PROJECT.EDIT.TITLE',
	icon: 'refresh',
	color: 'blue',
	name: 'projectEdit',
	url: '/projects/:projectId/edit',
	template: '<project-edit></project-edit>'
};

const PROJECT_PREVIEW = {
	pageTitle: 'PROJECT.PREVIEW.TITLE',
	icon: 'check-square-o',
	color: 'green',
	name: 'projectPreview',
	url: '/projects/:projectId/preview',
	template: '<project-preview></project-preview>'
};

const PROJECT_REMOVE = {
	pageTitle: 'PROJECT.REMOVE.TITLE',
	icon: 'remove',
	color: 'red',
	name: 'projectRemove',
	url: '/projects/:projectId/remove',
	template: '<project-remove></project-remove>'
};

const PROJECTS = {
	pageTitle: 'PROJECT.TAB.TITLE',
	icon: 'search',
	color: 'yellow',
	name: 'projects',
	url: '/projects',
	template: '<projects></projects>'
};

const RESPONSE_VIEW = {
	pageTitle: 'RESPONSE_VIEW.TITLE',
	icon: 'list',
	color: 'yellow',
	name: 'responseView',
	url: '/projects/:projectId/responses/:responseId',
	template: '<response-view></response-view>'
};


const STEP_VIEW = {
	pageTitle: 'STEP_VIEW.TITLE',
	icon: 'video-camera',
	color: 'blue',
	name: 'stepView',
	url: '/projects/:projectId/responses/:responseId/steps/:stepId',
	template: '<step-view></step-view>'
};

const USER_DETAILS = {
	pageTitle: 'USER.DETAILS.TITLE',
	icon: 'user-circle-o',
	color: 'yellow',
	name: 'userDetails',
	url: '/users/:userId/details',
	template: '<user-Details></user-Details>'
};

const USER_EDIT = {
	pageTitle: 'USER.EDIT.TITLE',
	icon: 'refresh',
	color: 'blue',
	name: 'userEdit',
	url: '/users/:userId/edit',
	template: '<user-edit></user-edit>'
};

const USERS = {
	pageTitle: 'USER.TAB.TITLE',
	icon: 'users',
	color: 'yellow',
	name: 'users',
	url: '/users',
	template: '<users></users>'
};

export {
	DATE_MASK,
	ABOUT,
	DASHBOARD,
	PROJECT_ADD,
	PROJECT_DETAILS,
	PROJECT_EDIT,
	PROJECT_PREVIEW,
	PROJECT_REMOVE,
	PROJECTS_ARCHIVE,
	PROJECTS_MY,
	PROJECTS,
	RESPONSE_VIEW,
	STEP_VIEW,
	USER_DETAILS,
	USER_EDIT,
	USERS
};