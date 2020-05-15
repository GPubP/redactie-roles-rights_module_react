import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRolesAPI } from './lib/api';
import { TenantContext } from './lib/context';
import { MODULE_PATHS } from './lib/roles.const';
import { RolesModuleProps } from './lib/roles.types';
import { UserDetailGeneral, UserDetailRoles, UsersOverview, UserUpdate } from './lib/views';

const RolesComponent: FC<RolesModuleProps> = ({ route, location, tenantId }) => {
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

Core.routes.register({
	path: MODULE_PATHS.tenantRoot,
	component: RolesComponent,
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
