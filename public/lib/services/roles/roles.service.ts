import api from '../api/api.service';

import { RolesResponse } from './roles.service.types';

export class RolesApiService {
	public async getTenantRoles(): Promise<RolesResponse> {
		return await api.get(`roles`).json();
	}

	public async getSiteRoles(siteUuid: string): Promise<RolesResponse> {
		return await api.get(`sites/${siteUuid}/roles`).json();
	}
}

export const rolesApiService = new RolesApiService();
