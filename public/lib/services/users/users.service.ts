import api, { parseSearchParams } from '../api/api.service';
import { RoleMapsResponses, RolesResponse } from '../roles';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	AddUserToSitePayload,
	GetUserPayload,
	GetUserRolesForSitePayload,
	GetUserRolesForTenantPayload,
	GetUserSecurityRightsForSitePayload,
	GetUserSecurityRightsForTenantPayload,
	GetUsersPayload,
	SearchUserRolesForSitePayload,
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

	public async getUser({ userUuid }: GetUserPayload): Promise<UserResponse> {
		return await api.get(`users/${userUuid}`).json();
	}

	public async getUserRolesForTenant({
		userUuid,
	}: GetUserRolesForTenantPayload): Promise<RolesResponse> {
		return await api.get(`users/${userUuid}/roles`).json();
	}

	public async updateUserRolesForTenant({
		userUuid,
		roles,
	}: UpdateUserRolesForTenantPayload): Promise<RolesResponse> {
		return await api
			.put(`users/${userUuid}/roles`, {
				json: {
					roles: roles,
				},
			})
			.json();
	}

	public async getUserRolesForSite({
		userUuid,
		siteUuid,
	}: GetUserRolesForSitePayload): Promise<RolesResponse> {
		return await api.get(`sites/${siteUuid}/users/${userUuid}/roles`).json();
	}

	public async searchUserRolesForSite({
		userUuid,
		siteUuids,
	}: SearchUserRolesForSitePayload): Promise<RoleMapsResponses> {
		return await api
			.post(`users/${userUuid}/roles/search`, {
				json: {
					level: 'site',
					levelIds: siteUuids,
				},
			})
			.json();
	}

	public async updateUserRolesForSite({
		userUuid,
		siteUuid,
		roles,
	}: UpdateUserRolesForSitePayload): Promise<RolesResponse> {
		return await api
			.put(`sites/${siteUuid}/users/${userUuid}/roles`, {
				json: {
					roles,
				},
			})
			.json();
	}

	public async addUserToSite({ siteUuid, userUuid }: AddUserToSitePayload): Promise<any> {
		return await api
			.post(`sites/${siteUuid}/users`, {
				json: {
					userId: userUuid,
				},
			})
			.json();
	}

	public async getUserSecurityRightsForTenant({
		userUuid,
	}: GetUserSecurityRightsForTenantPayload): Promise<any> {
		return await api.get(`users/${userUuid}/security-rights`).json();
	}

	public async getUserSecurityRightsForSite({
		siteUuid,
		userUuid,
	}: GetUserSecurityRightsForSitePayload): Promise<any> {
		return await api.get(`sites/${siteUuid}/users/${userUuid}/security-rights`).json();
	}
}

export const usersApiService = new UsersApiService();
