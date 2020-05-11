import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRolesAPI } from './lib/api';
import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import { UsersOverview } from './lib/views';

const RolesComponent: FC<RolesModuleProps> = ({ route, location, match, tenantId }) => {
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
				basePath: match.url,
				routes: route.routes,
				tenantId,
			})}
		</TenantContext.Provider>
	);
};

registerRoutes({
	path: MODULE_PATHS.siteRoot,
	component: RolesComponent,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Gebruikers',
	},
	routes: [
		{
			path: MODULE_PATHS.users.root,
			component: UsersOverview,
			navigation: {
				context: 'site',
				label: 'Gebruikers',
				parentPath: MODULE_PATHS.siteRoot,
			},
		},
	],
});

// API export

registerRolesAPI();

export * from './lib/api/api.types';
