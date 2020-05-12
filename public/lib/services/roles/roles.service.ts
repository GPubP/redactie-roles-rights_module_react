import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_ROLES_SEARCH_PARAMS } from './roles.service.const';
import { GetRolesPayload, RolesResponse } from './roles.service.types';

export class RolesApiService {
	public async getRolesBySite(
		searchParams: GetRolesPayload = DEFAULT_ROLES_SEARCH_PARAMS,
		siteId: string
	): Promise<RolesResponse> {
		return await api
			.get(`users-roles/v1/sites/${siteId}/users`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<RolesResponse>();
	}
}

export const rolesApiService = new RolesApiService();
