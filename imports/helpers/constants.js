const DATE_MASK = 'YYYY/MM/DD HH:mm';

const ABOUT = {
	pageTitle: 'About',
	icon: 'info-circle',
	color: 'yellow',
	name: 'about',
	url: '/about',
	template: '<about></about>'
};

const ARCHIVE = {
	pageTitle: 'Archive',
	icon: 'history',
	color: 'yellow',
	name: 'archive',
	url: '/archive',
	template: '<archive></archive>'
};

const DASHBOARD = {
	pageTitle: 'Dashboard',
	icon: 'line-chart',
	color: 'yellow',
	name: 'dashboard',
	url: '/dashboard',
	template: '<dashboard></dashboard>'
};

const MY_PROJECTS_TAB = {
	pageTitle: 'My Projects ',
	icon: 'search',
	color: 'blue',
	name: 'myProjectsTab',
	url: '/projects/my',
	template: '<my-projects-tab></my-projects-tab>'
};

const PROJECT_ADD = {
	pageTitle: 'Add new project ',
	icon: 'plus-circle',
	color: 'green',
	name: 'projectAdd',
	url: '/projects/new',
	template: '<project-add></project-add>'
};

const PROJECT_DETAILS = {
	pageTitle: 'Project details ',
	icon: 'line-chart',
	color: 'yellow',
	name: 'projectDetails',
	url: '/projects/:projectId/details',
	template: '<project-details></project-details>'
};

const PROJECT_EDIT = {
	pageTitle: 'Update your project ',
	icon: 'refresh',
	color: 'blue',
	name: 'projectEdit',
	url: '/projects/:projectId/edit',
	template: '<project-edit></project-edit>'
};

const PROJECT_PREVIEW = {
	pageTitle: 'Project preview ',
	icon: 'check-square-o',
	color: 'green',
	name: 'projectPreview',
	url: '/projects/:projectId/preview',
	template: '<project-preview></project-preview>'
};

const PROJECT_REMOVE = {
	pageTitle: 'Remove project: ',
	icon: 'remove',
	color: 'red',
	name: 'projectRemove',
	url: '/projects/:projectId/remove',
	template: '<project-remove></project-remove>'
};

const PROJECTS_TAB = {
	pageTitle: 'Projects ',
	icon: 'search',
	color: 'yellow',
	name: 'projectsTab',
	url: '/projects',
	template: '<projects-tab></projects-tab>'
};

const RESPONSE_VIEW = {
	pageTitle: 'Response View ',
	icon: 'check-square-o',
	color: 'yellow',
	name: 'responseView',
	url: '/projects/:projectId/responses/:responseId',
	template: '<response-view></response-view>'
};


const STEP_VIEW = {
	pageTitle: 'Step View ',
	icon: 'check-square-o',
	color: 'yellow',
	name: 'stepView',
	url: '/projects/:projectId/responses/:responseId/steps/:stepId',
	template: '<step-view></step-view>'
};

const USER_DETAILS = {
	pageTitle: 'Account Details ',
	icon: 'user-circle-o',
	color: 'yellow',
	name: 'userDetails',
	url: '/users/:userId/details',
	template: '<user-Details></user-Details>'
};

const USER_EDIT = {
	pageTitle: 'Update Account ',
	icon: 'refresh',
	color: 'blue',
	name: 'userEdit',
	url: '/users/:userId/edit',
	template: '<user-edit></user-edit>'
};

const USERS_TAB = {
	pageTitle: 'Users ',
	icon: 'users',
	color: 'yellow',
	name: 'users',
	url: '/users',
	template: '<users-tab>'
};

export {
	DATE_MASK,
	ABOUT,
	ARCHIVE,
	DASHBOARD,
	MY_PROJECTS_TAB,
	PROJECT_ADD,
	PROJECT_DETAILS,
	PROJECT_EDIT,
	PROJECT_PREVIEW,
	PROJECT_REMOVE,
	PROJECTS_TAB,
	RESPONSE_VIEW,
	STEP_VIEW,
	USER_DETAILS,
	USER_EDIT,
	USERS_TAB
};