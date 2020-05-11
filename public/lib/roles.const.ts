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

const siteRoot = '/:siteId/gebruikers';

const siteRolesRoot = `${siteRoot}/roles`;
const siteUsersRoot = `${siteRoot}/users`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteUsersOverview = `${siteUsersRoot}/overzicht`;

export const MODULE_PATHS = {
	siteRoot,
	users: {
		root: siteUsersRoot,
		overview: siteUsersOverview,
	},
	roles: {
		root: siteRolesRoot,
		overview: siteRolesOverview,
	},
};
