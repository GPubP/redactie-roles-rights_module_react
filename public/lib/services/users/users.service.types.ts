import { RoleModel } from '../../store/roles';
import { SearchParams } from '../api';

export interface UsersResponse {
	_embedded: UserResponse[];
	_page: UserMetaResponse;
}
export interface UserMetaResponse {
	size: number;
	totalElements: boolean;
	totalPages: number;
	number: number;
}

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

export interface GetUserPayload {
	id: string;
}

export interface GetUserRolesForTenantPayload {
	id: string;
}

export interface UpdateUserRolesForTenantPayload {
	id: string;
	roles: Array<string>;
	roleDetails?: RoleModel[];
}

export interface GetUserRolesForSitePayload {
	id: string;
	siteUuid: string;
}

export interface UpdateUserRolesForSitePayload {
	userId: string;
	siteUuid: string;
	roles: Array<string>;
	roleDetails?: RoleModel[];
}

export interface AddUserToSitePayload {
	userId: string;
	siteUuid: string;
}

export type GetUsersPayload = SearchParams;
