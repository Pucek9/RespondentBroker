const DATE_MASK = 'YYYY/MM/DD HH:mm';

const ABOUT = {
	pageTitle: 'ABOUT.TITLE',
	icon: 'info-circle',
	name: 'about',
	url: '/about',
	template: '<about></about>'
};

const DASHBOARD = {
	pageTitle: 'DASHBOARD.TITLE',
	icon: 'line-chart',
	name: 'dashboard',
	url: '/dashboard',
	template: '<dashboard></dashboard>'
};

const PROJECTS_ARCHIVE = {
	pageTitle: 'PROJECT.ARCHIVE.TITLE',
	icon: 'history',
	name: 'projectsArchive',
	url: '/projects/archive',
	template: '<projects-archive></projects-archive>'
};


const PROJECTS_MY = {
	pageTitle: 'PROJECT.MY.TITLE',
	icon: 'dashboard',
	name: 'projectsMy',
	url: '/projects/my',
	template: '<projects-my></projects-my>'
};

const PROJECT_ADD = {
	pageTitle: 'PROJECT.ADD.TITLE',
	icon: 'plus-circle',
	name: 'projectAdd',
	url: '/projects/new',
	template: '<project-add></project-add>'
};

const PROJECT_DETAILS = {
	pageTitle: 'PROJECT.DETAILS.TITLE',
	icon: 'line-chart',
	name: 'projectDetails',
	url: '/projects/:projectId/details',
	template: '<project-details></project-details>'
};

const PROJECT_EDIT = {
	pageTitle: 'PROJECT.EDIT.TITLE',
	icon: 'refresh',
	name: 'projectEdit',
	url: '/projects/:projectId/edit',
	template: '<project-edit></project-edit>'
};

const PROJECT_PREVIEW = {
	pageTitle: 'PROJECT.PREVIEW.TITLE',
	icon: 'eye',
	name: 'projectPreview',
	url: '/projects/:projectId/preview',
	template: '<project-preview></project-preview>'
};

const PROJECT_REMOVE = {
	pageTitle: 'PROJECT.REMOVE.TITLE',
	icon: 'remove',
	name: 'projectRemove',
	url: '/projects/:projectId/remove',
	template: '<project-remove></project-remove>'
};

const PROJECTS = {
	pageTitle: 'PROJECT.TAB.TITLE',
	icon: 'search',
	name: 'projects',
	url: '/projects',
	template: '<projects></projects>'
};

const RESPONSE_VIEW = {
	pageTitle: 'RESPONSE_VIEW.TITLE',
	icon: 'check-square-o',
	name: 'responseView',
	url: '/projects/:projectId/responses/:responseId',
	template: '<response-view></response-view>'
};

const STEP_VIEW = {
	pageTitle: 'STEP_VIEW.TITLE',
	icon: 'video-camera',
	name: 'stepView',
	url: '/projects/:projectId/responses/:responseId/steps/:stepId',
	template: '<step-view></step-view>'
};

const USER_DETAILS = {
	pageTitle: 'USER.DETAILS.TITLE',
	icon: 'user-circle-o',
	name: 'userDetails',
	url: '/users/:userId/details',
	template: '<user-Details></user-Details>'
};

const USER_EDIT = {
	pageTitle: 'USER.EDIT.TITLE',
	icon: 'refresh',
	name: 'userEdit',
	url: '/users/:userId/edit',
	template: '<user-edit></user-edit>'
};

const USERS = {
	pageTitle: 'USER.TAB.TITLE',
	icon: 'users',
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