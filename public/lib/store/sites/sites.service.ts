import { GetSitesPayload, sitesApiService, SitesApiService } from '../../services/sites';

import { SitesStore, sitesStore } from './sites.store';

export class SitesService {
	constructor(private store: SitesStore, private sitesService: SitesApiService) {}

	public getSites(payload: GetSitesPayload): void {
		this.store.setIsFetching(true);
		this.sitesService
			.getSites()
			.then(sitesResponse => {
				const sites = sitesResponse._embedded;

				const populatedSites = sites.map(site => {
					return this.sitesService
						.getUserRolesForSite({ id: payload.id, siteUuid: site.uuid })
						.then(rolesResponse => {
							return { ...site, roles: rolesResponse._embedded };
						})
						.catch(err => {
							this.store.setIsFetching(false);
							this.store.setError(err);
						});
				});

				Promise.all(populatedSites).then(result => {
					const meta = sitesResponse._page;

					this.store.set(result);

					this.store.update({
						meta,
					});

					this.store.setIsFetching(false);
				});
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}
}

export const sitesService = new SitesService(sitesStore, sitesApiService);
