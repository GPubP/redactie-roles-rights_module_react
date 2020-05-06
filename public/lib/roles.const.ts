export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/sites',
		'/:tenantId/sites/:siteId/roles',
		'/:tenantId/sites/:siteId/users',
		'/:tenantId/sites/:siteId/users/:userId',
	],
};

const root = '/:siteId';

const rolesRoot = `${root}/roles`;
const usersRoot = `${root}/users`;

const rolesOverview = `${rolesRoot}/overzicht`;
const usersOverview = `${usersRoot}/overzicht`;

export const MODULE_PATHS = {
	root,
	users: {
		root: usersRoot,
		overview: usersOverview,
	},
	roles: {
		root: rolesRoot,
		overview: rolesOverview,
	},
};
