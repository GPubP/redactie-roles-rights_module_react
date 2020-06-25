import api, { parseSearchParams } from '../api/api.service';

import { GetRolesPayload, RoleResponse, RolesResponse } from './roles.service.types';

export class RolesApiService {
	public async getTenantRoles(): Promise<RolesResponse> {
		return await api.get(`roles`).json();
	}

	public async getSiteRoles(
		siteUuid: string,
		searchParams: GetRolesPayload
	): Promise<RolesResponse> {
		return await api
			.get(`sites/${siteUuid}/roles`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json();
	}

	public async getSiteRole(siteUuid: string, roleId: string): Promise<RoleResponse> {
		return await api.get(`sites/${siteUuid}/roles/${roleId}`).json();
	}
}

export const rolesApiService = new RolesApiService();
