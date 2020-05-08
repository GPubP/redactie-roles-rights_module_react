export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/users',
		'/:tenantId/users/overzicht',
		'/:tenantId/users/:userId',
	],
};

const root = '/users';

const usersRoot = `${root}`;

const usersOverview = `${usersRoot}/overzicht`;

const userDetail = `${usersRoot}/:userUuid`;
const userDetailGeneral = `${userDetail}/algemeen`;

export const MODULE_PATHS = {
	root,
	users: {
		root: usersRoot,
		overview: usersOverview,
		detail: userDetail,
		detailGeneral: userDetailGeneral,
	},
};
