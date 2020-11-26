import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { from, Observable } from 'rxjs';
import { BaseEntityFacade } from '@redactie/utils';

import {
	GetSitePayload,
	GetSitesPayload,
	sitesApiService,
	SitesApiService,
	SitesData,
} from '../../services/sites';
import { UsersApiService, usersApiService } from '../../services/users';
import { SiteModel, SitesState } from './sites.model';

import { SitesQuery, sitesQuery } from './sites.query';
import { SitesStore, sitesStore } from './sites.store';
import { sitesPaginator } from './sites.paginator';

export class SitesFacade extends BaseEntityFacade<SitesStore, SitesApiService, SitesQuery> {
	constructor(
		protected store: SitesStore,
		protected service: SitesApiService,
		protected query: SitesQuery,
		private userService: UsersApiService,
		private paginator: PaginatorPlugin<SitesState>
	) {
		super(store, service, query);
	}

	public readonly sites$ = this.query.sites$;
	public readonly site$ = this.query.site$;

	public getSitesPaginated(
		payload: GetSitesPayload,
		clearCache = false
	): Observable<PaginationResponse<SiteModel>> {
		if (clearCache) {
			this.paginator.clearCache();
		}

		this.store.setIsFetching(true);

		return from(
			this.service
				.getSites(payload)
				.then(async (response: SitesData | null) => {
					if (!response) {
						return;
					}

					const siteRolesMap = await this.userService.searchUserRolesForSite({
						userUuid: payload.userUuid,
						siteUuids: response.data.map(site => site.uuid),
					});

					const result = response.data.map(site => {
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

					this.store.update({
						meta: response.meta,
						isFetching: false,
					});

					return {
						perPage: parseInt(response.meta.size, 10),
						currentPage: parseInt(response.meta.number, 10),
						lastPage: response.meta.totalPages,
						total: response.meta.totalElements,
						data: result,
					};
				})
				.catch(error => {
					this.store.update({
						error,
						isFetching: false,
					});
					return error;
				})
		);
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
	sitesQuery,
	usersApiService,
	sitesPaginator,
);
