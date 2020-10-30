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

export interface UsersBasePayload {
	userUuid: string;
}

// Tenant
export type GetUserRolesForTenantPayload = UsersBasePayload;
export type GetUserSecurityRightsForTenantPayload = UsersBasePayload;
export type GetUserPayload = UsersBasePayload;
export type GetUsersPayload = SearchParams;
export interface UpdateUserRolesForTenantPayload extends UsersBasePayload {
	roles: Array<string>;
}

// Site
export interface GetUserRolesForSitePayload extends UsersBasePayload {
	siteUuid: string;
}

export interface SearchUserRolesForSitePayload extends UsersBasePayload {
	siteUuids: string[];
}

export interface UpdateUserRolesForSitePayload extends UsersBasePayload {
	siteUuid: string;
	roles: Array<string>;
}

export interface AddUserToSitePayload extends UsersBasePayload {
	siteUuid: string;
}

export type GetUserSecurityRightsForSitePayload = AddUserToSitePayload;
