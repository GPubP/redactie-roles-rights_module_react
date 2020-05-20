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

export interface UpdateUserRolesPayload {
	id: string;
	roles: Array<string>;
}

export interface AddUserToSitePayload {
	userId: string;
	siteId: string;
}

export interface GetUserRolesForSitePayload {
	id: string;
	siteUuid: string;
}

export type GetUsersPayload = SearchParams;
