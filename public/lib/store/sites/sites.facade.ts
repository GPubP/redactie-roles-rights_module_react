import { GetSitesPayload, SitesApiService, sitesApiService } from '../../services/sites';
import { UsersApiService, usersApiService } from '../../services/users';

import { SiteModel } from './sites.model';
import { SitesQuery, sitesQuery } from './sites.query';
import { SitesStore, sitesStore } from './sites.store';

export class SitesFacade {
	constructor(
		private store: SitesStore,
		private service: SitesApiService,
		private userService: UsersApiService,
		private query: SitesQuery
	) {}

	public readonly sites$ = this.query.sites$;
	public readonly error$ = this.query.error$;
	public readonly isFetching$ = this.query.isFetching$;

	public getSites(payload: GetSitesPayload): void {
		this.store.setIsFetching(true);
		this.service
			.getSites()
			.then(sitesResponse => {
				const sites = sitesResponse._embedded;

				const populatedSites = sites.map(
					(site): Promise<SiteModel> =>
						new Promise(resolve => {
							this.userService
								.getUserRolesForSite({ id: payload.id, siteUuid: site.uuid })
								.then(rolesResponse => {
									return resolve({
										...site,
										roles: rolesResponse._embedded,
										hasAccess: true,
									});
								})
								.catch(() => {
									// don't crash when the server response
									return resolve({
										...site,
										roles: [],
										hasAccess: false,
									});
								});
						})
				);

				Promise.all(populatedSites)
					.then(result => {
						const meta = sitesResponse._page;

						this.store.set(result);

						this.store.update({
							meta,
						});

						this.store.setIsFetching(false);
					})
					.catch(err => {
						this.store.setIsFetching(false);
						this.store.setError(err);
					});
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}
}

export const sitesFacade = new SitesFacade(
	sitesStore,
	sitesApiService,
	usersApiService,
	sitesQuery
);
