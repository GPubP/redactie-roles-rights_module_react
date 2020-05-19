import { RolesModel } from '../../store/roles';
import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	GetUserPayload,
	GetUsersPayload,
	UpdateUserRolesPayload,
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

	public async getUsersBySite(
		searchParams: GetUsersPayload = DEFAULT_USERS_SEARCH_PARAMS,
		siteId: string
	): Promise<UsersResponse> {
		return await api
			.get(`sites/${siteId}/users`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<UsersResponse>();
	}

	public async getUser({ id }: GetUserPayload): Promise<UserResponse> {
		return await api.get(`users/${id}`).json<UserResponse>();
	}

	public async getUserRoles({ id }: GetUserPayload): Promise<RolesModel> {
		return await api.get(`users/${id}/roles`).json<RolesModel>();
	}

	public async updateUserRoles({ id, roles }: UpdateUserRolesPayload): Promise<any> {
		return await api
			.post(`users/${id}/roles`, {
				json: {
					roles: roles,
				},
			})
			.json<any>();
	}
}

export const usersApiService = new UsersApiService();
