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

const tenantRolesRoot = `${tenantRoot}/roles`;

export const MODULE_PATHS = {
	dashboard: '/dashboard',
	tenantRoot,
	tenantUsersOverview,
	tenantUserDetail,
	tenantUserDetailGeneral,
	tenantRolesRoot,
};
