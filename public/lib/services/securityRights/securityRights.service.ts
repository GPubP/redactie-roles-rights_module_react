import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_SECURITYRIGHTS_SEARCH_PARAMS } from './roles.service.const';
import {
	GetSecurityRightsPayload,
	SecurityRightMatrixResponse,
	UpdateRolesMatrixPayload,
} from './securityRights.service.types';

export class SecurityRightsApiService {
	public async getRolesBySite(
		searchParams: GetSecurityRightsPayload = DEFAULT_SECURITYRIGHTS_SEARCH_PARAMS,
		siteId: string
	): Promise<SecurityRightMatrixResponse> {
		return await api
			.get(`sites/${siteId}/roles-security-rights-matrix`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<SecurityRightMatrixResponse>();
	}

	public async updateSecurityRightsForSite(
		siteId: string,
		rolesSecurityRights: UpdateRolesMatrixPayload
	): Promise<SecurityRightMatrixResponse> {
		return await api
			.put(`sites/${siteId}/roles-security-rights-matrix`, {
				json: {
					rolesSecurityRights,
				},
			})
			.json();
	}
}

export const securityRightsApiService = new SecurityRightsApiService();
