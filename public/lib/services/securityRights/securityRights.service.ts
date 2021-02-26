import { parseSearchParams } from '@redactie/utils';

import api from '../api/api.service';

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
		roles: UpdateRolesMatrixPayload
	): Promise<SecurityRightMatrixResponse> {
		return await api
			.put(`sites/${siteId}/roles-security-rights-matrix`, {
				json: {
					roles,
				},
			})
			.json();
	}

	public async updateSecurityRightsForSiteByCompartment(
		siteId: string,
		roles: UpdateRolesMatrixPayload,
		type: string,
		id: string
	): Promise<SecurityRightMatrixResponse> {
		return await api
			.put(`sites/${siteId}/roles-security-rights-matrix/${type}/${id}`, {
				json: {
					roles,
				},
			})
			.json();
	}
}

export const securityRightsApiService = new SecurityRightsApiService();
