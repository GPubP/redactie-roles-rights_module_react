import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_ROLES_SEARCH_PARAMS } from './roles.service.const';
import { GetSecurityRightsPayload, SecurityRightsResponse } from './roles.service.types';

export class RolesApiService {
	public async getRolesBySite(
		searchParams: GetSecurityRightsPayload = DEFAULT_ROLES_SEARCH_PARAMS,
		siteId: string
	): Promise<SecurityRightsResponse> {
		return await api
			.get(`users-roles/v1/sites/${siteId}/users`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<SecurityRightsResponse>();
	}
}

export const rolesApiService = new RolesApiService();
