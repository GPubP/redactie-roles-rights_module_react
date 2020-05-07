import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import { UsersOverview } from './lib/views';

const RolesComponent: FC<RolesModuleProps> = ({ route, location, match, tenantId }) => {
	// if path is /users, redirect to /users/overzicht
	if (/\/users$/.test(location.pathname)) {
		return <Redirect to={`/${tenantId}/users/overzicht`} />;
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

Core.routes.register({
	path: '/users',
	component: RolesComponent,
	navigation: {
		label: 'Gebruikers',
	},
	routes: [
		{
			path: '/users/overzicht',
			component: UsersOverview,
			navigation: {
				label: 'Gebruikers',
				parentPath: '/users',
			},
		},
	],
});
