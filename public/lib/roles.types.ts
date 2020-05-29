import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { FC } from 'react';

import { SecurableRenderProps } from './components/SecurableRender/SecurableRender.types';
import { SecurityRightsSiteGuardFunction, SecurityRightsTenantGuardFunction } from './guards';
import {
	MySecurityRightModel,
	MySecurityRightsFacade,
	MySecurityRightsQuery,
} from './store/mySecurityRights';
import { RolesFacade, RolesQuery } from './store/roles';
import {
	SecurityRightsMatrixFacade,
	SecurityRightsMatrixQuery,
} from './store/securityRightsMatrix';
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

export interface RolesRightsModuleAPI {
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
			service: Partial<SecurityRightsMatrixFacade>;
			query: SecurityRightsMatrixQuery;
		};
		mySecurityRights: {
			service: Partial<MySecurityRightsFacade>;
			query: MySecurityRightsQuery;
		};
	};
	hooks: {
		useMySecurityRightsForSite: (options: {
			module?: string;
			onlyKeys: boolean;
		}) => [LoadingState | null, MySecurityRightModel[] | string[] | undefined];
		useMySecurityRightsForTenant: (
			onlyKeys: boolean
		) => [LoadingState | null, MySecurityRightModel[] | string[] | undefined];
	};
	components: {
		SecurableRender: FC<SecurableRenderProps>;
	};
	guards: {
		securityRightsTenantGuard: SecurityRightsTenantGuardFunction;
		securityRightsSiteGuard: SecurityRightsSiteGuardFunction;
	};
	views: {
		Forbidden403View: FC;
	};
}
