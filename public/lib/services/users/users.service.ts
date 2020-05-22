import api, { parseSearchParams } from '../api/api.service';
import { RolesResponse } from '../roles';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	AddUserToSitePayload,
	GetUserPayload,
	GetUserRolesForSitePayload,
	GetUserRolesForTenantPayload,
	GetUsersPayload,
	UpdateUserRolesForSitePayload,
	UpdateUserRolesForTenantPayload,
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
		return await api.get(`users/${id}`).json();
	}

	public async getUserRolesForTenant({
		id,
	}: GetUserRolesForTenantPayload): Promise<RolesResponse> {
		return await api.get(`users/${id}/roles`).json();
	}

	public async updateUserRolesForTenant({
		id,
		roles,
	}: UpdateUserRolesForTenantPayload): Promise<RolesResponse> {
		return await api
			.put(`users/${id}/roles`, {
				json: {
					roles: roles,
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

	public async updateUserRolesForSite({
		userId,
		siteUuid,
		roles,
	}: UpdateUserRolesForSitePayload): Promise<RolesResponse> {
		return await api
			.put(`sites/${siteUuid}/users/${userId}/roles`, {
				json: {
					roles,
				},
			})
			.json();
	}

	public async addUserToSite({ siteUuid, userId }: AddUserToSitePayload): Promise<any> {
		return await api
			.post(`sites/${siteUuid}/users`, {
				json: {
					userId,
				},
			})
			.json();
	}
}

export const usersApiService = new UsersApiService();
