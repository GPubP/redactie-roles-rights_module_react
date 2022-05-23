import { FC } from 'react';

import {
	SecurityRightsSiteCanShownFunction,
	SecurityRightsTenantCanShownFunction,
} from '../canShowns';
import { SecurableRenderProps } from '../components/SecurableRender/SecurableRender.types';
import { SecurityRightsSiteGuardFunction, SecurityRightsTenantGuardFunction } from '../guards';
import { CheckSecurityRightsFunction } from '../helpers';
import { UseMySecurityRightsForSiteFunction } from '../hooks/useMySecurityRightsForSite/useMySecurityRightsForSite.types';
import { UseMySecurityRightsForTenantFunction } from '../hooks/useMySecurityRightsForTenant/useMySecurityRightsForTenant.types';
import { UseSiteRolesFunction } from '../hooks/useSiteRoles/useSiteRoles.types';
import { UseUserRolesForSiteFunction } from '../hooks/useUserRolesForSite/useUserRolesForSite.types';
import { UseUsersFunction } from '../hooks/useUsers/useUsers.types';
import {
	MySecurityRightModel,
	MySecurityRightsFacade,
	MySecurityRightsQuery,
	MySecurityRightsState,
} from '../store/mySecurityRights';
import { RoleModel, RolesFacade, RolesMetaModel, RolesQuery, RolesState } from '../store/roles';
import {
	SecurityRightMatrixModel,
	SecurityRightsMatrixFacade,
	SecurityRightsMatrixQuery,
	SecurityRightsMatrixState,
} from '../store/securityRightsMatrix';
import { UserModel, UsersFacade, UsersMetaModel, UsersQuery, UsersState } from '../store/users';

export interface RolesRightsModuleConstsAPI {
	forbidden403Path: string;
}

export interface RolesRightsModuleStoreAPI {
	users: {
		service: Pick<
			UsersFacade,
			'getUsersBySite' | 'getUsers' | 'getUser' | 'getUserRolesForSite'
		>;
		query: UsersQuery;
	};
	roles: {
		service: Pick<RolesFacade, 'getSiteRoles' | 'getTenantRoles' | 'getDefaultSiteRoles'>;
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
}

export interface RolesRightsModuleHooksAPI {
	useMySecurityRightsForSite: UseMySecurityRightsForSiteFunction;
	useMySecurityRightsForTenant: UseMySecurityRightsForTenantFunction;
	useUsers: UseUsersFunction;
	useSiteRoles: UseSiteRolesFunction;
	useUserRolesForSite: UseUserRolesForSiteFunction;
}

export interface RolesRightsModuleComponentsAPI {
	SecurableRender: FC<SecurableRenderProps>;
}

export interface RolesRightsModuleGuardsAPI {
	securityRightsTenantGuard: SecurityRightsTenantGuardFunction;
	securityRightsSiteGuard: SecurityRightsSiteGuardFunction;
}

export interface RolesRightsModuleCanShowsAPI {
	securityRightsTenantCanShown: SecurityRightsTenantCanShownFunction;
	securityRightsSiteCanShown: SecurityRightsSiteCanShownFunction;
}

export interface RolesRightsModuleHelpersAPI {
	checkSecurityRights: CheckSecurityRightsFunction;
}

export interface RolesRightsModuleViewsAPI {
	Forbidden403View: FC;
}

export interface RolesRightsModuleAPI {
	consts: RolesRightsModuleConstsAPI;
	store: RolesRightsModuleStoreAPI;
	hooks: RolesRightsModuleHooksAPI;
	components: RolesRightsModuleComponentsAPI;
	guards: RolesRightsModuleGuardsAPI;
	canShowns: RolesRightsModuleCanShowsAPI;
	helpers: RolesRightsModuleHelpersAPI;
	views: RolesRightsModuleViewsAPI;
}

export {
	UserModel,
	UsersMetaModel,
	UsersState,
	RoleModel,
	RolesMetaModel,
	SecurityRightMatrixModel,
	SecurityRightsMatrixState,
	RolesState,
	MySecurityRightModel,
	MySecurityRightsState,
	SecurityRightsSiteGuardFunction,
	SecurityRightsTenantGuardFunction,
	SecurityRightsTenantCanShownFunction,
	SecurityRightsSiteCanShownFunction,
};
