import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import {
	MySecurityRightModel,
	MySecurityRightsFacade,
	MySecurityRightsQuery,
} from './store/mySecurityRights';
import { RolesFacade, RolesQuery } from './store/roles';
import { SecurityRightsFacade, SecurityRightsQuery } from './store/securityRights';
import { UsersFacade, UsersQuery } from './store/users';

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

export interface Page {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}

export interface Links {
	self?: {
		href: string;
	};
	first?: {
		href: string;
	};
	last?: {
		href: string;
	};
	prev?: {
		href: string;
	};
	next?: {
		href: string;
	};
}

export interface EmbeddedResponse<T> {
	_embedded: T[];
	_links: Links;
	_page: Page;
}

export interface UsersModuleAPI {
	routes: ModuleRouteConfig;
	store: {
		users: {
			service: Partial<UsersFacade>;
			query: UsersQuery;
		};
		roles: {
			service: Partial<RolesFacade>;
			query: RolesQuery;
		};
		securityRights: {
			service: Partial<SecurityRightsFacade>;
			query: SecurityRightsQuery;
		};
		mySecurityRights: {
			service: Partial<MySecurityRightsFacade>;
			query: MySecurityRightsQuery;
		};
	};
	hooks: {
		useMySecurityRightsForSite: () => [LoadingState, MySecurityRightModel[]];
		useMySecurityRightsForTenant: () => [LoadingState, MySecurityRightModel[]];
	};
}
