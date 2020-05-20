import api, { parseSearchParams } from '../api/api.service';
import { RolesResponse } from '../roles';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	AddUserToSitePayload,
	GetUserPayload,
	GetUserRolesForSitePayload,
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
			.get(`users-roles/v1/sites/${siteId}/users`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<UsersResponse>();
	}

	public async getUser({ id }: GetUserPayload): Promise<UserResponse> {
		return await api.get(`users/${id}`).json();
	}

	public async getUserRoles({ id }: GetUserPayload): Promise<RolesResponse> {
		return await api.get(`users/${id}/roles`).json();
	}

	public async updateUserRoles({ id, roles }: UpdateUserRolesPayload): Promise<any> {
		return await api
			.post(`users/${id}/roles`, {
				json: {
					roles: roles,
				},
			})
			.json();
	}

	public async addUserToSite({ siteId, userId }: AddUserToSitePayload): Promise<any> {
		return await api
			.post(`sites/${siteId}/users`, {
				json: {
					userId,
				},
			})
			.json();
	}

	public async getUserRolesForSite({
		id,
		siteUuid,
	}: GetUserRolesForSitePayload): Promise<RolesResponse> {
		return await api.get(`sites/${siteUuid}/users/${id}/roles`).json();
	}
}

export const usersApiService = new UsersApiService();
