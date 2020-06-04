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
		'/:tenantId/sites',
		'/:tenantId/sites/:siteUuid/users',
		'/:tenantId/sites/:siteUuid/users/:userId',
	],
};
export const urlSiteParam = ':siteId';

const forbidden403 = '/403';
const siteRoot = `/${urlSiteParam}/users`;
const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;

const siteRolesRoot = `${siteRoot}/roles`;
const siteUsersRoot = `${siteRoot}`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteUsersOverview = `${siteUsersRoot}/overzicht`;
const tenantUserDetail = `${tenantRoot}/:userUuid`;
const tenantUserDetailGeneral = `${tenantUserDetail}/algemeen`;
const tenantUserDetailRoles = `${tenantUserDetail}/rollen`;
const tenantUserDetailRolesUpdate = `${tenantUserDetail}/sites/:siteUuid/rollen`;
const siteUserDetailRolesUpdate = `${siteUsersRoot}/:userUuid/rollen`;

const tenantRolesRoot = `${tenantRoot}/roles`;

export const MODULE_PATHS = {
	forbidden403,
	siteRoot,
	dashboard: '/dashboard',
	tenantRoot,
	tenantUsersOverview,
	users: {
		overview: siteUsersOverview,
	},
	roles: {
		overview: siteRolesOverview,
	},
	tenantUserDetail,
	tenantUserDetailGeneral,
	tenantUserDetailRoles,
	tenantUserDetailRolesUpdate,
	tenantRolesRoot,
	siteUserDetailRolesUpdate,
};

export enum SecurityRightsSite {
	UsersRead = 'users-read-all',
	UsersUpdateSiteRoles = 'users-update-site-roles',
	RolesRightsReadRolePermissions = 'read-role-permissions',
	RolesRightsUpdateRolePermissions = 'update-role-permissions',
}

export enum SecurityRightsTenant {
	UsersRead = 'users-read-all',
	UsersUpdateTenantRoles = 'users-update-tenant-roles',
	UsersGrantSiteAccess = 'users-grant-site-access',
	UsersUpdateSiteRoles = 'users-update-site-roles',
}
