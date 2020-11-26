import { parseSearchParams } from '../api';
import sitesApi from '../sitesApi/sitesApi.service';

import { GetSitePayload, GetSitesPayload, SiteResponse, SitesData, SitesResponse } from './sites.service.types';

export class SitesApiService {
	public async getSites(searchParams?: GetSitesPayload): Promise<SitesData | null> {
		try {
			const response: SitesResponse = await sitesApi.get('sites', {
				...searchParams && { searchParams: parseSearchParams(searchParams)},
			}).json();

			if (!response._embedded) {
				throw new Error('Failed to get sites');
			}

			return {
				meta: response._page,
				data: response._embedded,
			};
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async getSite({ id }: GetSitePayload): Promise<SiteResponse> {
		return await sitesApi.get(`sites/${id}`).json<SiteResponse>();
	}
}

export const sitesApiService = new SitesApiService();
