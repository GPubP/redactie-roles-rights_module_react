import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import { Routes } from './services/routes';
import { UsersQuery, UsersService } from './store/users';
export interface RolesModuleProps extends RouteConfigComponentProps {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface RolesRouteProps<Params = {}> extends RouteConfigComponentProps<Params> {
	routes: ModuleRouteConfig[];
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
