export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId'],
};

const siteRoot = '/:siteId/gebruikers';
const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;

const siteRolesRoot = `${siteRoot}/roles`;
const siteUsersRoot = `${siteRoot}/users`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteUsersOverview = `${siteUsersRoot}/overzicht`;

export const MODULE_PATHS = {
	siteRoot,
	dashboard: '/dashboard',
	tenantRoot,
	tenantUsersOverview,
	users: {
		root: siteUsersRoot,
		overview: siteUsersOverview,
	},
	roles: {
		root: siteRolesRoot,
		overview: siteRolesOverview,
	},
};
