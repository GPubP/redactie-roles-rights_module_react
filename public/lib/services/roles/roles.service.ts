import { parseSearchParams } from '@redactie/utils';

import api from '../api/api.service';

import { GetRolesPayload, RolePayload, RoleResponse, RolesResponse } from './roles.service.types';

export class RolesApiService {
	public async getTenantRoles(): Promise<RolesResponse> {
		return await api.get(`roles`).json();
	}

	public async getDefaultSiteRoles(): Promise<RolesResponse> {
		return await api.get('default-site-roles').json();
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

	public async createSiteRole({ siteId, body }: RolePayload): Promise<RoleResponse> {
		return await api.post(`sites/${siteId}/roles`, { json: body }).json();
	}

	public async updateSiteRole({ siteId, roleId, body }: RolePayload): Promise<RoleResponse> {
		return await api.put(`sites/${siteId}/roles/${roleId}`, { json: body }).json();
	}

	public async deleteSiteRole({ siteId, roleId }: RolePayload): Promise<RoleResponse> {
		return await api.delete(`sites/${siteId}/roles/${roleId}`).json();
	}
}

export const rolesApiService = new RolesApiService();
