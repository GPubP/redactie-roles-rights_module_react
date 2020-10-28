import { Observable } from 'rxjs';

import { usersApiService, UsersApiService } from '../../services/users';

import { MySecurityRightModel } from './mySecurityRights.model';
import { mySecurityRightsQuery, MySecurityRightsQuery } from './mySecurityRights.query';
import { mySecurityRightsStore, MySecurityRightsStore } from './mySecurityRights.store';

export class MySecurityRightsFacade {
	constructor(
		private store: MySecurityRightsStore,
		private service: UsersApiService,
		private query: MySecurityRightsQuery
	) {}

	public readonly data$ = this.query.data$;
	public readonly tenantRights$ = this.query.tenantRights$;
	public readonly siteRights$ = this.query.siteRights$;

	public readonly error$ = this.query.error$;
	public readonly isFetchingTenantRights$ = this.query.isFetchingTenantRights$;
	public readonly isFetchingSiteRights$ = this.query.isFetchingSiteRights$;

	public selectSiteRightsByModule(
		siteUuid: string,
		module?: string
	): Observable<MySecurityRightModel[]> {
		if (!module) {
			return this.siteRights$(siteUuid);
		}
		return this.query.selectSiteRightsByModule(siteUuid, module);
	}

	public getMyTenantSecurityRights(clearCache = false): Promise<void> {
		if (clearCache) {
			this.store.setTenantRightsCache(false);
		}

		if (this.query.getIsFetchingTenantRights()) {
			return Promise.resolve();
		}

		// Almost every module needs tenant or site security rights
		// We don't want to get the same information multiple times
		// Therefore we are using a simple caching system
		if (!this.query.getTenantRightsHasCache()) {
			this.store.setIsFetchingTenantRights(true);
			return this.service
				.getUserSecurityRightsForTenant({
					userUuid: 'me',
				})
				.then(response => {
					this.store.setTenantRightsCache(true);
					this.store.setHasCache(true);
					this.store.setTenantRights(response._embedded);
				})
				.catch(err => {
					this.store.setError(err);
					throw new Error(err);
				})
				.finally(() => this.store.setIsFetchingTenantRights(false));
		}

		return Promise.resolve();
	}

	public getMySiteSecurityRights(siteUuid: string, clearCache = false): Promise<void> {
		if (clearCache) {
			this.store.setSiteRightsCache(false);
		}

		if (this.query.getIsFetchingSiteRights()) {
			return Promise.resolve();
		}

		const alreadyInCache = this.query.getSiteRightsCacheSiteUuid() === siteUuid;
		// Almost every module needs tenant or site security rights
		// We don't want to get the same information multiple times
		// Therefore we are using a simple caching system
		if (!alreadyInCache || !this.query.getSiteRightsHasCache()) {
			this.store.setIsFetchingSiteRights(true);

			return this.service
				.getUserSecurityRightsForSite({
					userUuid: 'me',
					siteUuid,
				})
				.then(response => {
					this.store.setSiteRightsCache(true, siteUuid);
					this.store.setHasCache(true);
					this.store.setSiteRights(siteUuid, response._embedded);
				})
				.catch(err => {
					this.store.setError(err);
					throw new Error(err);
				})
				.finally(() => this.store.setIsFetchingSiteRights(false));
		}

		return Promise.resolve();
	}

	public getMySecurityRights(siteUuid?: string, clearCache = false): void {
		if (siteUuid) {
			this.getMySiteSecurityRights(siteUuid, clearCache);
		}

		this.getMyTenantSecurityRights();
	}
}

export const mySecurityRightsFacade = new MySecurityRightsFacade(
	mySecurityRightsStore,
	usersApiService,
	mySecurityRightsQuery
);
