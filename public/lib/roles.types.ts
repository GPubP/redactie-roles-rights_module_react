import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import { Routes } from './services/routes';
import { UsersQuery, UsersService } from './store/users';

export interface RolesModuleProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface RolesRouteProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export enum LoadingState {
	Loading = 'loading',
	Loaded = 'loaded',
	Error = 'error',
}
export interface FilterFormState {
	name: string;
}

export interface UsersModuleAPI {
	routes: Routes;
	store: {
		users: {
			service: Partial<UsersService>;
			query: UsersQuery;
		};
	};
}
