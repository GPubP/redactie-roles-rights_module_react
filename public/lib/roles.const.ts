export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/sites',
		'/:tenantId/sites/:siteId/gebruikers',
		'/:tenantId/sites/:siteId/gebruikers/users',
		'/:tenantId/sites/:siteId/gebruikers/users/:userId',
		'/:tenantId/sites/:siteId/gebruikers/roles',
	],
};

const root = '/:siteId/gebruikers';

const rolesRoot = `${root}/roles`;
const usersRoot = `${root}/users`;

const rolesOverview = `${rolesRoot}/overzicht`;
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
	roles: {
		root: rolesRoot,
		overview: rolesOverview,
	},
};
