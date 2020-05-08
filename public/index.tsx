import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import { UserDetailGeneral, UserDetailRoles, UsersOverview, UserUpdate } from './lib/views';

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
	path: MODULE_PATHS.root,
	component: RolesComponent,
	navigation: {
		label: 'Gebruikers',
	},
	exact: true,
	routes: [
		{
			path: MODULE_PATHS.users.overview,
			component: UsersOverview,
		},
		{
			path: MODULE_PATHS.users.detail,
			component: UserUpdate,
			routes: [
				{
					path: MODULE_PATHS.users.detailGeneral,
					component: UserDetailGeneral,
				},
				{
					path: MODULE_PATHS.users.detailRoles,
					component: UserDetailRoles,
				},
			],
		},
	],
});
