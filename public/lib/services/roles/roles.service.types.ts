import { SearchParams } from '../api';

export interface RolesResponse {
	_embedded: RoleResponse[];
	_page: RoleMetaResponse;
}
export interface RoleMetaResponse {
	size: number;
	totalElements: boolean;
	totalPages: number;
	number: number;
}

export interface RoleResponse {
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

export interface GetRolePayload {
	id: string;
}

export type GetRolesPayload = SearchParams;
