import api from '../api/api.service';
import sitesApi from '../sitesApi/sitesApi.service';

import { GetUserRolesForSitePayload, SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(): Promise<SitesResponse> {
		return await sitesApi.get(`sites`).json<SitesResponse>();
	}

	public async getUserRolesForSite({ id, siteUuid }: GetUserRolesForSitePayload): Promise<any> {
		return await api.get(`sites/${siteUuid}/users/${id}/roles`).json<any>();
	}
}

export const sitesApiService = new SitesApiService();
