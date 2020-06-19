// uncomment to enable akita devTools
// import { akitaDevtools } from '@datorama/akita';
import Core from '@redactie/redactie-core';
import React, { FC, useMemo } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRolesAPI } from './lib/api';
import { securityRightsSiteCanShown, securityRightsTenantCanShown } from './lib/canShowns';
import { RenderChildRoutes } from './lib/components';
import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
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
	RolesOverview,
	RolesRightsOverview,
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

const SiteRolesComponent: FC<RolesModuleProps> = ({ route, location, tenantId }) => {
	const guardsMeta = useMemo(
		() => ({
			tenantId,
		}),
		[tenantId]
	);
	const extraOptions = useMemo(
		() => ({
			routes: route.routes,
		}),
		[route.routes]
	);
	// if path is /users, redirect to /users/overzicht
	if (
		/\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\/users$/.test(
			location.pathname
		)
	) {
		return <Redirect to={`${location.pathname}/overzicht`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		</TenantContext.Provider>
	);
};

const TenantRolesComponent: FC<RolesModuleProps> = ({ route, location, tenantId }) => {
	const guardsMeta = useMemo(
		() => ({
			tenantId,
		}),
		[tenantId]
	);
	const extraOptions = useMemo(
		() => ({
			routes: route.routes,
		}),
		[route.routes]
	);

	// if path is /users, redirect to /users/overzicht
	if (/\/users$/.test(location.pathname)) {
		return <Redirect to={`/${tenantId}/users/overzicht`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		</TenantContext.Provider>
	);
};

registerRoutes({
	path: MODULE_PATHS.siteRoot,
	component: SiteRolesComponent,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
		canShown: [
			securityRightsSiteCanShown(
				urlSiteParam,
				[SecurityRightsSite.RolesRightsReadRolePermissions, SecurityRightsSite.UsersRead],
				true
			),
		],
	},
	routes: [
		{
			path: MODULE_PATHS.siteUserDetailRolesUpdate,
			component: SiteUserDetailRolesUpdate,
			guardOptions: {
				guards: [
					securityRightsSiteGuard(urlSiteParam, [
						SecurityRightsSite.UsersUpdateSiteRoles,
					]),
				],
			},
		},
		{
			path: MODULE_PATHS.rolesRights.overview,
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
			component: RolesOverview,
			guardOptions: {
				guards: [
					securityRightsSiteGuard(urlSiteParam, [
						SecurityRightsSite.RolesRightsReadRolePermissions,
					]),
				],
			},
			navigation: {
				context: 'site',
				label: 'Rollen',
				parentPath: MODULE_PATHS.siteRoot,
				canShown: [
					securityRightsSiteCanShown(urlSiteParam, [
						SecurityRightsSite.RolesRightsReadRolePermissions,
					]),
				],
			},
		},
		{
			path: MODULE_PATHS.users.overview,
			component: SiteUsersOverview,
			guardOptions: {
				guards: [securityRightsSiteGuard(urlSiteParam, [SecurityRightsSite.UsersRead])],
			},
			navigation: {
				context: 'site',
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.siteRoot,
				canShown: [
					securityRightsSiteCanShown(urlSiteParam, [SecurityRightsSite.UsersRead]),
				],
			},
		},
	],
});

Core.routes.register({
	path: MODULE_PATHS.tenantRoot,
	component: TenantRolesComponent,
	guardOptions: {
		guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersRead])],
	},
	navigation: {
		label: 'Gebruikers',
		canShown: [securityRightsTenantCanShown([SecurityRightsTenant.UsersRead])],
	},
	exact: true,
	routes: [
		{
			path: MODULE_PATHS.tenantUsersOverview,
			component: UsersOverview,
			navigation: {
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.tenantRoot,
			},
		},
		{
			path: MODULE_PATHS.tenantUserDetailRolesUpdate,
			component: UserDetailRolesUpdate,
			guardOptions: {
				guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersUpdateSiteRoles])],
			},
		},
		{
			path: MODULE_PATHS.tenantUserDetail,
			component: UserUpdate,
			guardOptions: {
				guards: [securityRightsTenantGuard([SecurityRightsTenant.UsersUpdateTenantRoles])],
			},
			routes: [
				{
					path: MODULE_PATHS.tenantUserDetailGeneral,
					component: UserDetailGeneral,
				},
				{
					path: MODULE_PATHS.tenantUserDetailRoles,
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
