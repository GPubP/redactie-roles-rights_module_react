import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface RolesModuleProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface RolesRouteProps<Params = {}> extends RouteConfigComponentProps<Params> {
	basePath: string;
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
