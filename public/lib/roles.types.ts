import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { AlertProps, ContextHeaderTab, FilterItem } from '@redactie/utils';
import { FC } from 'react';

import {
	SecurityRightsSiteCanShownFunction,
	SecurityRightsTenantCanShownFunction,
} from './canShowns';
import { SecurableRenderProps } from './components/SecurableRender/SecurableRender.types';
import { SecurityRightsSiteGuardFunction, SecurityRightsTenantGuardFunction } from './guards';
import { CheckSecurityRightsFunction } from './helpers';
import { UseMySecurityRightsForSiteFunction } from './hooks/useMySecurityRightsForSite/useMySecurityRightsForSite.types';
import { UseMySecurityRightsForTenantFunction } from './hooks/useMySecurityRightsForTenant/useMySecurityRightsForTenant.types';
import { UseUsersFunction } from './hooks/useUsers/useUsers.types';
import { ALERT_CONTAINER_IDS } from './roles.const';
import { MySecurityRightsFacade, MySecurityRightsQuery } from './store/mySecurityRights';
import { RolesFacade, RolesQuery } from './store/roles';
import {
	SecurityRightsMatrixFacade,
	SecurityRightsMatrixQuery,
} from './store/securityRightsMatrix';
import { UsersFacade, UsersQuery } from './store/users';

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

export interface RolesRightsModuleAPI {
	consts: {
		forbidden403Path: string;
	};
	store: {
		users: {
			service: Pick<UsersFacade, 'getUsersBySite' | 'getUsers' | 'getUser'>;
			query: UsersQuery;
		};
		roles: {
			service: Pick<RolesFacade, 'getSiteRoles' | 'getTenantRoles'>;
			query: RolesQuery;
		};
		securityRights: {
			service: Pick<SecurityRightsMatrixFacade, 'getSecurityRightsBySite'>;
			query: SecurityRightsMatrixQuery;
		};
		mySecurityRights: {
			service: Pick<
				MySecurityRightsFacade,
				'getMyTenantSecurityRights' | 'getMySiteSecurityRights' | 'getMySecurityRights'
			>;
			query: MySecurityRightsQuery;
		};
	};
	hooks: {
		useMySecurityRightsForSite: UseMySecurityRightsForSiteFunction;
		useMySecurityRightsForTenant: UseMySecurityRightsForTenantFunction;
		useUsers: UseUsersFunction;
	};
	components: {
		SecurableRender: FC<SecurableRenderProps>;
	};
	guards: {
		securityRightsTenantGuard: SecurityRightsTenantGuardFunction;
		securityRightsSiteGuard: SecurityRightsSiteGuardFunction;
	};
	canShowns: {
		securityRightsTenantCanShown: SecurityRightsTenantCanShownFunction;
		securityRightsSiteCanShown: SecurityRightsSiteCanShownFunction;
	};
	helpers: {
		checkSecurityRights: CheckSecurityRightsFunction;
	};
	views: {
		Forbidden403View: FC;
	};
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

export type AlertMessages<T extends string | number | symbol> = Record<
	T,
	{ [key in 'success' | 'error']: AlertProps }
>;
