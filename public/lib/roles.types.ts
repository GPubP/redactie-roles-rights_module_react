import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import { RolesQuery, RolesService } from './store/roles';
import { SecurityRightsFacade, SecurityRightsQuery } from './store/securityRights';
import { UsersQuery, UsersService, usersFacade } from './store/users';

export interface RolesModuleProps extends RouteConfigComponentProps {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface RolesRouteProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export enum LoadingState {
	Loading = 'loading',
	Loaded = 'loaded',
	Error = 'error',
}

export enum ContentType {
	UserRoles = 'UserRoles',
	SiteRoles = 'SiteRoles',
}

export interface UsersModuleAPI {
	routes: ModuleRouteConfig;
	store: {
		users: {
			service: Partial<UsersFacade>;
			query: UsersQuery;
		};
		roles: {
			service: Partial<RolesService>;
			query: RolesQuery;
		};
		securityRights: {
			service: Partial<SecurityRightsFacade>;
			query: SecurityRightsQuery;
		};
	};
}
