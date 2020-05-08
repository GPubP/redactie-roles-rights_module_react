export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId'],
};

const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;
const root = '/:siteId/gebruikers';

const rolesRoot = `${root}/roles`;
const usersRoot = `${root}/users`;

const rolesOverview = `${rolesRoot}/overzicht`;
const usersOverview = `${usersRoot}/overzicht`;

export const MODULE_PATHS = {
	tenantRoot,
	tenantUsersOverview,
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
