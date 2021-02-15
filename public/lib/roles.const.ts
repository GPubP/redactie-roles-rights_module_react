import { ContextHeaderBadge } from '@redactie/utils';

import { Tab } from './roles.types';

export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/users/:userId/sites',
		'/:tenantId/users/:userId/sites/:siteUuid([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})',
		'/:tenantId/sites',
		'/:tenantId/sites/:siteUuid',
		'/:tenantId/sites/:siteUuid/users/rolesrights',
		'/:tenantId/sites/:siteUuid/users/roles',
		'/:tenantId/sites/:siteUuid/users/:userId([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})',
	],
};
export const SITES_ROOT = 'sites';
export const TENANT_ROOT = '/:tenantId';
export const urlSiteParam = 'siteId';

const forbidden403 = '/403';
const siteRoot = `/:${urlSiteParam}/users`;
const tenantRoot = '/users';
const tenantUsersOverview = `${tenantRoot}/overzicht`;

const siteRolesRoot = `${siteRoot}/roles`;
const siteRolesRightsRoot = `${siteRoot}/rolesrights`;
const siteUsersRoot = `${siteRoot}`;

const siteRolesOverview = `${siteRolesRoot}/overzicht`;
const siteRolesCreate = `${siteRolesRoot}/aanmaken`;
const siteRolesDetail = `${siteRolesRoot}/:roleId`;
const siteRolesRightsOverview = `${siteRolesRightsRoot}/overzicht`;
const siteUsersOverview = `${siteUsersRoot}/overzicht`;
const siteUsersOverviewSite = `${siteUsersRoot}/overzicht/site`;
const siteUsersOverviewTenant = `${siteUsersRoot}/overzicht/tenant`;
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
	siteUsersOverview,
	users: {
		siteOverview: siteUsersOverviewSite,
		tenantOverview: siteUsersOverviewTenant,
	},
	roles: {
		overview: siteRolesOverview,
		create: siteRolesCreate,
		detail: siteRolesDetail,
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

export enum ALERT_CONTAINER_IDS {
	UPDATE_USER_ROLES_SITE_ON_TENANT = 'update-user-roles-site-on-tenant',
	UPDATE_USER_ROLES_SITE_ON_SITE = 'update-user-roles-site-on-tenant',
	UPDATE_USER_ROLES_TENANT = 'update-user-roles-tenant',
	UPDATE_ROLE_ON_SITE = 'update-role-on-site',
}

export const SITE_USER_OVERVIEW_TAB_MAP: {
	[key in 'site' | 'tenant']: Tab;
} = {
	site: {
		name: 'Site',
		target: 'site',
		active: true,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
	tenant: {
		name: 'Tenant',
		target: 'tenant',
		active: false,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
};

export const SITE_USER_OVERVIEW_TABS: Tab[] = [
	SITE_USER_OVERVIEW_TAB_MAP.site,
	SITE_USER_OVERVIEW_TAB_MAP.tenant,
];

export const SITE_CONTEXT_DEFAULT_BREADCRUMBS = [
	{
		name: 'Gebruikers',
		target: '',
	},
];

export enum SecurityRightsSite {
	UsersRead = 'roles-rights_read-users',
	UsersUpdateSiteRoles = 'roles-rights_update-site-roles',
	RolesRightsReadRolePermissions = 'roles-rights_read-role-permissions',
	RolesRightsUpdateRolePermissions = 'roles-rights_update-role-permissions',
	RolesRead = 'roles_read',
	RolesCreate = 'roles_create',
	RolesUpdate = 'roles_update',
	RolesDelete = 'roles_delete',
}

export enum SecurityRightsTenant {
	UsersRead = 'roles-rights_read-users',
	UsersUpdateTenantRoles = 'roles-rights_update-users-tenant-roles',
	UsersGrantSiteAccess = 'roles-rights_grant-users-site-access',
	UsersUpdateSiteRoles = 'roles-rights_update-users-site-roles',
}

export const DEFAULT_USER_DETAIL_HEADER_BADGES: ContextHeaderBadge[] = [
	{
		name: 'Gebruiker',
		type: 'primary',
	},
];

export const DEFAULT_ROLES_DETAIL_HEADER_BADGES: ContextHeaderBadge[] = [
	{
		name: 'Rol',
		type: 'primary',
	},
];
