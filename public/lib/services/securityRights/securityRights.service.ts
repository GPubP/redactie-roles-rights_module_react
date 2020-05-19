import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_SECURITYRIGHTS_SEARCH_PARAMS } from './roles.service.const';
import { GetSecurityRightsPayload, SecurityRightsResponse } from './securityRights.service.types';

export class SecurityRightsApiService {
	public async getRolesBySite(
		searchParams: GetSecurityRightsPayload = DEFAULT_SECURITYRIGHTS_SEARCH_PARAMS,
		siteId: string
	): Promise<SecurityRightsResponse> {
		return await api
			.get(`sites/${siteId}/roles-security-rights-matrix`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<SecurityRightsResponse>();
	}
}

export const securityRightsApiService = new SecurityRightsApiService();
