import sitesApi from '../sitesApi/sitesApi.service';

import { GetSitePayload, SiteResponse, SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(): Promise<SitesResponse> {
		return await sitesApi.get(`sites`).json();
	}

	public async getSite({ id }: GetSitePayload): Promise<SiteResponse> {
		return await sitesApi.get(`sites/${id}`).json<SiteResponse>();
	}
}

export const sitesApiService = new SitesApiService();
