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
export const urlSiteParam = 'siteId';

const forbidden403 = '/403';
const siteRoot = `/:${urlSiteParam}/users`;
const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;

const siteRolesRoot = `${siteRoot}/roles`;
const siteRolesRightsRoot = `${siteRoot}/rolesrights`;
const siteUsersRoot = `${siteRoot}`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteRolesRightsOverview = `${siteRolesRightsRoot}/overzicht`;
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
	rolesRights: {
		overview: siteRolesRightsOverview,
	},
	tenantUserDetail,
	tenantUserDetailGeneral,
	tenantUserDetailRoles,
	tenantUserDetailRolesUpdate,
	tenantRolesRoot,
	siteUserDetailRolesUpdate,
};

export enum SecurityRightsSite {
	UsersRead = 'roles-rights_read-users',
	UsersUpdateSiteRoles = 'roles-rights_update-site-roles',
	RolesRightsReadRolePermissions = 'roles-rights_read-role-permissions',
	RolesRightsUpdateRolePermissions = 'roles-rights_update-role-permissions',
}

export enum SecurityRightsTenant {
	UsersRead = 'roles-rights_read-users',
	UsersUpdateTenantRoles = 'roles-rights_update-users-tenant-roles',
	UsersGrantSiteAccess = 'roles-rights_grant-users-site-access',
	UsersUpdateSiteRoles = 'roles-rights_update-users-site-roles',
}
