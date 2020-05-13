import api from '../sitesApi/sitesApi.service';

import { SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(): Promise<SitesResponse> {
		return await api.get(`sites`).json<SitesResponse>();
	}
}

export const sitesApiService = new SitesApiService();
