// uncomment to enable akita devTools
// import { akitaDevtools } from '@datorama/akita';
import Core from '@redactie/redactie-core';
import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { registerRolesAPI } from './lib/api';
import { securityRightsSiteCanShown, securityRightsTenantCanShown } from './lib/canShowns';
import { sitesConnector } from './lib/connectors';
import { securityRightsSiteGuard, securityRightsTenantGuard } from './lib/guards';
import {
	MODULE_PATHS,
	SecurityRightsSite,
	SecurityRightsTenant,
	urlSiteParam,
} from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import {
	Forbidden403View,
	RolesCreate,
	RolesOverview,
	RolesRightsOverview,
	RolesUpdate,
	SiteUserDetailRolesUpdate,
	SiteUsersOverview,
	UserDetailGeneral,
	UserDetailRoles,
	UserDetailRolesUpdate,
	UsersOverview,
	UserUpdate,
} from './lib/views';

// uncomment to enable akita devTools
// akitaDevtools();

const RolesRootComponent: FC<RolesModuleProps<{ siteId: string }>> = ({
	route,
	tenantId,
	match,
}) => {
	const { siteId } = match.params;
	const guardsMeta = useMemo(
		() => ({
			tenantId,
		}),
		[tenantId]
	);
	const extraOptions = useMemo(
		() => ({
			routes: route.routes,
			tenantId,
		}),
		[route.routes, tenantId]
	);
	return (
		<TenantContext.Provider value={{ tenantId }}>
			<SiteContext.Provider value={{ siteId }}>
				<RenderChildRoutes
					routes={route.routes}
					guardsMeta={guardsMeta}
					extraOptions={extraOptions}
				/>
			</SiteContext.Provider>
		</TenantContext.Provider>
	);
};

sitesConnector.registerRoutes({
	path: MODULE_PATHS.siteRoot,
	breadcrumb: false,
	component: RolesRootComponent,
	redirect: MODULE_PATHS.users.siteOverview,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
		order: 3,
		canShown: [
			securityRightsSiteCanShown(
				urlSiteParam,
				// The top menu item is visible when the user has one of the following
				// permissions
				[
					SecurityRightsSite.RolesRightsReadRolePermissions,
					SecurityRightsSite.RolesRead,
					SecurityRightsSite.UsersRead,
				],
				true
			),
		],
	},
	routes: [
		{
			path: MODULE_PATHS.siteUserDetailRolesUpdate,
			breadcrumb: false,
			component: SiteUserDetailRolesUpdate,
			guardOptions: {
				guards: [
					securityRightsSiteGuard(urlSiteParam, [
						SecurityRightsSite.UsersRead,
						SecurityRightsSite.RolesRead,
					]),
				],
			},
		},
		{
			path: MODULE_PATHS.rolesRights.overview,
			breadcrumb: false,
			component: RolesRightsOverview,
			guardOptions: {
				guards: [
					securityRightsSiteGuard(urlSiteParam, [
						SecurityRightsSite.RolesRightsReadRolePermissions,
					]),
				],
			},
			navigation: {
				context: 'site',
				label: 'Rollen en rechten',
				order: 0,
				parentPath: MODULE_PATHS.siteRoot,
				canShown: [
					securityRightsSiteCanShown(urlSiteParam, [
						SecurityRightsSite.RolesRightsReadRolePermissions,
					]),
				],
			},
		},
		{
			path: MODULE_PATHS.roles.overview,
			breadcrumb: false,
			component: RolesOverview,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.RolesRead])],
			},
			navigation: {
				context: 'site',
				order: 1,
				label: 'Rollen',
				parentPath: MODULE_PATHS.siteRoot,
				canShown: [
					securityRightsSiteCanShown(urlSiteParam, [SecurityRightsSite.RolesRead]),
				],
			},
		},
		{
			path: MODULE_PATHS.roles.create,
			breadcrumb: false,
			component: RolesCreate,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.RolesCreate])],
			},
		},
		{
			path: MODULE_PATHS.roles.detail,
			breadcrumb: false,
			component: RolesUpdate,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.RolesRead])],
			},
		},
		{
			path: MODULE_PATHS.users.siteOverview,
			breadcrumb: false,
			component: SiteUsersOverview,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.UsersRead])],
			},
			navigation: {
				context: 'site',
				label: 'Gebruikers',
				order: 2,
				parentPath: MODULE_PATHS.siteRoot,
				canShown: [
					securityRightsSiteCanShown(urlSiteParam, [SecurityRightsSite.UsersRead]),
				],
			},
		},
		{
			path: MODULE_PATHS.users.tenantOverview,
			breadcrumb: false,
			component: SiteUsersOverview,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.UsersRead])],
			},
		},
	],
});

Core.routes.register({
	path: MODULE_PATHS.tenantRoot,
	breadcrumb: false,
	component: RolesRootComponent,
	redirect: MODULE_PATHS.tenantUsersOverview,
	guardOptions: {
		guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersRead])],
	},
	navigation: {
		label: 'Gebruikers',
		order: 2,
		canShown: [securityRightsTenantCanShown([SecurityRightsTenant.UsersRead])],
	},
	exact: true,
	routes: [
		{
			path: MODULE_PATHS.tenantUsersOverview,
			breadcrumb: false,
			component: UsersOverview,
		},
		{
			path: MODULE_PATHS.tenantUserDetailRolesUpdate,
			breadcrumb: false,
			component: UserDetailRolesUpdate,
			guardOptions: {
				guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersUpdateSiteRoles])],
			},
		},
		{
			path: MODULE_PATHS.tenantUserDetail,
			breadcrumb: false,
			component: UserUpdate,
			redirect: MODULE_PATHS.tenantUserDetailGeneral,
			guardOptions: {
				guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersUpdateTenantRoles])],
			},
			routes: [
				{
					path: MODULE_PATHS.tenantUserDetailGeneral,
					breadcrumb: false,
					component: UserDetailGeneral,
				},
				{
					path: MODULE_PATHS.tenantUserDetailRoles,
					breadcrumb: false,
					component: UserDetailRoles,
				},
			],
		},
	],
});

Core.routes.register({
	path: MODULE_PATHS.forbidden403,
	component: Forbidden403View,
});

// API export

registerRolesAPI();

export * from './lib/api/api.types';
