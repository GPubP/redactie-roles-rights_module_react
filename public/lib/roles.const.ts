export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/users',
		'/:tenantId/users/overzicht',
		'/:tenantId/users/:userId',
		'/:tenantId/users/:userId/sites',
		'/:tenantId/users/:userId/sites/:siteUuid',
		'/:tenantId/users/:userId/sites/:siteUuid/rollen',
	],
};

const siteRoot = '/:siteId/gebruikers';
const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;

const siteRolesRoot = `${siteRoot}/roles`;
const siteUsersRoot = `${siteRoot}/users`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteUsersOverview = `${siteUsersRoot}/overzicht`;
const tenantUserDetail = `${tenantRoot}/:userUuid`;
const tenantUserDetailGeneral = `${tenantUserDetail}/algemeen`;
const tenantUserDetailRoles = `${tenantUserDetail}/rollen`;
const tenantUserDetailRolesUpdate = `${tenantUserDetail}/sites/:siteUuid/rollen`;

const tenantRolesRoot = `${tenantRoot}/roles`;

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
	tenantUserDetail,
	tenantUserDetailGeneral,
	tenantUserDetailRoles,
	tenantUserDetailRolesUpdate,
	tenantRolesRoot,
};
