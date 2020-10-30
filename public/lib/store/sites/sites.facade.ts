import { BaseEntityFacade } from '@redactie/utils';

import {
	GetSitePayload,
	GetSitesPayload,
	sitesApiService,
	SitesApiService,
} from '../../services/sites';
import { UsersApiService, usersApiService } from '../../services/users';

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

	public async getSites(payload: GetSitesPayload): Promise<void> {
		this.store.setIsFetching(true);

		try {
			const sitesResponse = await this.service.getSites();
			const sites = sitesResponse._embedded;
			const siteRolesMap = await this.userService.searchUserRolesForSite({
				userUuid: payload.id,
				siteUuids: sites.map(site => site.uuid),
			});
			const result = sites.map(site => {
				const siteMap = siteRolesMap._embedded.find(
					siteRoleMap => siteRoleMap.team.attributes.site === site.uuid
				);

				if (!siteMap) {
					return {
						...site,
						roles: [],
						hasAccess: false,
					};
				}

				return {
					...site,
					roles: siteMap.roles,
					hasAccess: true,
				};
			});

			const meta = sitesResponse._page;

			this.store.set(result);

			this.store.update({
				meta,
			});

			this.store.setIsFetching(false);
		} catch (error) {
			console.log(error);
			this.store.setIsFetching(false);
			this.store.setError(error);
		}
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
