import api from '../api/api.service';
import { RolesResponse } from '../roles';
import sitesApi from '../sitesApi/sitesApi.service';

import { GetUserRolesForSitePayload, SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(): Promise<SitesResponse> {
		return await sitesApi.get(`sites`).json();
	}

	public async getUserRolesForSite({
		id,
		siteUuid,
	}: GetUserRolesForSitePayload): Promise<RolesResponse> {
		return await api.get(`sites/${siteUuid}/users/${id}/roles`).json();
	}
}

export const sitesApiService = new SitesApiService();
