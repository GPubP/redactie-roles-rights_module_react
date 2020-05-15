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
export interface CreateUserPayload {
	firstname: string;
	lastname: string;
}

export interface UpdateUserPayload {
	id: string;
	body: CreateUserPayload;
}

export type GetUsersPayload = SearchParams;
