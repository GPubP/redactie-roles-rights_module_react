import { SitesApiService, sitesApiService } from '../../services/sites';

import { SitesStore, sitesStore } from './sites.store';

export class SitesService {
	constructor(private store: SitesStore, private sitesService: SitesApiService) {}

	public getSites(): void {
		this.store.setIsFetching(true);
		this.sitesService
			.getSites()
			.then(response => {
				this.store.setIsFetching(false);
				const sites = response._embedded;
				const meta = response._page;

				this.store.set(sites);
				this.store.update({
					meta,
				});
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}
}

export const sitesService = new SitesService(sitesStore, sitesApiService);
