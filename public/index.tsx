import { akitaDevtools } from '@datorama/akita';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRolesAPI } from './lib/api';
import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import {
	RolesOverview,
	SiteUserDetailRolesUpdate,
	SiteUsersOverview,
	UserDetailGeneral,
	UserDetailRoles,
	UserDetailRolesUpdate,
	UsersOverview,
	UserUpdate,
} from './lib/views';

akitaDevtools();

const SiteRolesComponent: FC<RolesModuleProps> = ({ route, location, tenantId }) => {
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
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				routes: route.routes,
			})}
		</TenantContext.Provider>
	);
};

const TenantRolesComponent: FC<RolesModuleProps> = ({ route, location, tenantId }) => {
	// if path is /users, redirect to /users/overzicht
	if (/\/users$/.test(location.pathname)) {
		return <Redirect to={`/${tenantId}/users/overzicht`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				routes: route.routes,
			})}
		</TenantContext.Provider>
	);
};

console.log({
	path: MODULE_PATHS.siteRoot,
	component: SiteRolesComponent,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
	},
	routes: [
		{
			path: MODULE_PATHS.siteUserDetailRolesUpdate,
			component: SiteUserDetailRolesUpdate,
		},
		{
			path: MODULE_PATHS.users.root,
			component: SiteUsersOverview,
			navigation: {
				context: 'site',
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.siteRoot,
			},
		},
		{
			path: MODULE_PATHS.roles.root,
			component: RolesOverview,
			navigation: {
				context: 'site',
				label: 'Rollen en rechten',
				parentPath: MODULE_PATHS.siteRoot,
			},
		},
	],
});

registerRoutes({
	path: MODULE_PATHS.siteRoot,
	component: SiteRolesComponent,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
	},
	routes: [
		{
			path: MODULE_PATHS.siteUserDetailRolesUpdate,
			component: SiteUserDetailRolesUpdate,
		},
		{
			path: MODULE_PATHS.roles.root,
			component: RolesOverview,
			navigation: {
				context: 'site',
				label: 'Rollen en rechten',
				parentPath: MODULE_PATHS.siteRoot,
			},
		},
		{
			path: MODULE_PATHS.users.root,
			component: SiteUsersOverview,
			navigation: {
				context: 'site',
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.siteRoot,
			},
		},
	],
});

Core.routes.register({
	path: MODULE_PATHS.tenantRoot,
	component: TenantRolesComponent,
	navigation: {
		label: 'Gebruikers',
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
		},
		{
			path: MODULE_PATHS.tenantUserDetail,
			component: UserUpdate,
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

// API export

registerRolesAPI();

export * from './lib/api/api.types';
