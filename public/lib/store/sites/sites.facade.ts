import { BaseEntityFacade } from '@redactie/utils';

import {
	GetSitePayload,
	GetSitesPayload,
	sitesApiService,
	SitesApiService,
} from '../../services/sites';
import { UsersApiService, usersApiService } from '../../services/users';

import { SiteModel } from './sites.model';
import { SitesQuery, sitesQuery } from './sites.query';
import { SitesStore, sitesStore } from './sites.store';

export class SitesFacade extends BaseEntityFacade<SitesStore, SitesApiService, SitesQuery> {
	constructor(
		protected store: SitesStore,
		protected service: SitesApiService,
		private userService: UsersApiService,
		protected query: SitesQuery
	) {
		super(store, service, query);
	}

	public readonly sites$ = this.query.sites$;
	public readonly site$ = this.query.site$;

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
								.getUserRolesForSite({ userUuid: payload.id, siteUuid: site.uuid })
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

	public getSite(payload: GetSitePayload): void {
		this.store.setIsFetching(true);
		this.service
			.getSite(payload)
			.then(response => {
				this.store.update({
					site: response,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}
}

export const sitesFacade = new SitesFacade(
	sitesStore,
	sitesApiService,
	usersApiService,
	sitesQuery
);
