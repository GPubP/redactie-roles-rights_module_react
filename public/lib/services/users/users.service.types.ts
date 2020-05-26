import { EmbeddedResponse } from '../../roles.types';
import { SearchParams } from '../api';

export type UsersResponse = EmbeddedResponse<UserResponse>;

export interface UserResponse {
	address: string;
	domain: string;
	email: string;
	externalMutableReference: string;
	firstname: string;
	id: string;
	lastname: string;
	nickname: string;
	owner: boolean;
	type: string;
	username: string;
}

// Tenant
export interface GetUserRolesForTenantPayload {
	userUuid: string;
}

export interface UpdateUserRolesForTenantPayload {
	userUuid: string;
	roles: Array<string>;
}

export type GetUserSecurityRightsForTenantPayload = {
	userUuid: string;
};

export interface GetUserPayload {
	userUuid: string;
}

export type GetUsersPayload = SearchParams;

// Site
export interface GetUserRolesForSitePayload {
	userUuid: string;
	siteUuid: string;
}

export interface UpdateUserRolesForSitePayload {
	userUuid: string;
	siteUuid: string;
	roles: Array<string>;
}

export interface AddUserToSitePayload {
	userUuid: string;
	siteUuid: string;
}

export type GetUserSecurityRightsForSitePayload = AddUserToSitePayload;
