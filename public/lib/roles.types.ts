import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { AlertProps, ContextHeaderTab, FilterItem } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from './roles.const';

export * from './api/api.types';

export interface RolesModuleProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
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

export enum ContentType {
	UserRoles = 'UserRoles',
	SiteRoles = 'SiteRoles',
}

export interface RoleDetailFormState {
	name: string;
	description: string;
	admin?: boolean;
}

export interface Tab extends ContextHeaderTab {
	containerId: ALERT_CONTAINER_IDS;
}

export interface OverviewFilterItem extends FilterItem {
	filterKey: string;
	formvalue?: any;
}

export enum RolesRightsCompartmentType {
	ContentType = 'content-type',
	Module = 'Module',
}

export type AlertMessages<T extends string | number | symbol> = Record<
	T,
	{ [key in 'success' | 'error' | string]: AlertProps }
>;
