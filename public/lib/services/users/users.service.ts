import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	CreateUserPayload,
	GetUserPayload,
	GetUsersPayload,
	UpdateUserPayload,
	UserResponse,
	UsersResponse,
} from './users.service.types';

export class UsersApiService {
	public async getUsers(
		searchParams: GetUsersPayload = DEFAULT_USERS_SEARCH_PARAMS
	): Promise<UsersResponse> {
		return await api
			.get('users', {
				searchParams: parseSearchParams(searchParams),
			})
			.json<UsersResponse>();
	}

	public async getUser({ id }: GetUserPayload): Promise<UserResponse> {
		return await api.get(`users/${id}`).json<UserResponse>();
	}

	public async createUser(payload: CreateUserPayload): Promise<UserResponse> {
		return await api.post('users', { json: payload }).json();
	}

	public async updateUser({ body, id }: UpdateUserPayload): Promise<UserResponse> {
		return await api.put(`users/${id}`, { json: body }).json();
	}
}

export const usersApiService = new UsersApiService();
