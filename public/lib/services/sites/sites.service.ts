import api from '../api/api.service';
import { RolesResponse } from '../roles';
import sitesApi from '../sitesApi/sitesApi.service';

import { SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(): Promise<SitesResponse> {
		return await sitesApi.get(`sites`).json();
	}
}

export const sitesApiService = new SitesApiService();
