import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesRouteProps } from './lib/roles.types';
import { RolesOverview, UsersOverview, UserUpdate } from './lib/views';

const RolesComponent: FC<RolesRouteProps> = ({ route, location, match, tenantId }) => {
	// if path is /rights, redirect to /rights/overzicht
	if (
		/\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\/roles$/.test(
			location.pathname
		)
	) {
		return <Redirect to={`${location.pathname}/overzicht`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				basePath: match.url,
				routes: route.routes,
				tenantId,
			})}
		</TenantContext.Provider>
	);
};

const usersComponent: FC<RolesRouteProps> = ({ route, location, match, tenantId }) => {
	// if path is /gebruikers/users, redirect to /gebruikers/users/overzicht
	if (/\/gebruikers\/users$/.test(location.pathname)) {
		return <Redirect to={`${location.pathname}/overzicht`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				basePath: match.url,
				routes: route.routes,
				tenantId,
			})}
		</TenantContext.Provider>
	);
};

registerRoutes({
	path: MODULE_PATHS.root,
	component: RolesComponent,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
	},
	exact: true,
	routes: [
		{
			path: MODULE_PATHS.roles.root,
			component: RolesOverview,
			navigation: {
				renderContext: 'site',
				context: 'site',
				label: 'Rollen en rechten',
				parentPath: MODULE_PATHS.root,
			},
			routes: [
				{
					path: MODULE_PATHS.roles.overview,
					component: RolesOverview,
				},
			],
		},
		{
			path: MODULE_PATHS.users.root,
			component: usersComponent,
			navigation: {
				renderContext: 'site',
				context: 'site',
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.root,
			},
			routes: [
				{
					path: MODULE_PATHS.users.overview,
					component: UsersOverview,
				},
				{
					path: MODULE_PATHS.users.detail,
					component: UserUpdate,
				},
			],
		},
	],
});
