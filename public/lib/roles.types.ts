import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

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
