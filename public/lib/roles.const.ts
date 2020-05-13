export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/users',
		'/:tenantId/users/overzicht',
		'/:tenantId/users/:userId',
	],
};

const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;
const tenantUserDetail = `${tenantRoot}/:userUuid`;
const tenantUserDetailGeneral = `${tenantUserDetail}/algemeen`;
const tenantUserDetailRoles = `${tenantUserDetail}/rollen`;
const tenantUserDetailRolesUpdate = `${tenantUserDetail}/sites/:siteUuid/rollen`;

const tenantRolesRoot = `${tenantRoot}/roles`;

export const MODULE_PATHS = {
	tenantRoot,
	tenantUsersOverview,
	tenantUserDetail,
	tenantUserDetailGeneral,
	tenantUserDetailRoles,
	tenantUserDetailRolesUpdate,
	tenantRolesRoot,
};
