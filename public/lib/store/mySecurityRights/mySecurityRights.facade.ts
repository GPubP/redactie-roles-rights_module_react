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
	public readonly isFetching$ = this.query.isFetching$;

	public selectSiteRightsByModule(module?: string): Observable<MySecurityRightModel[]> {
		if (!module) {
			return this.siteRights$;
		}
		return this.query.selectSiteRightsByModule(module);
	}

	public getMyTenantSecurityRights(clearCache = false): void {
		if (clearCache) {
			this.store.setTenantRightsCache(false);
		}

		// Almost every module needs tenant or site security rights
		// We don't want to get the same information multiple times
		// Therefore we are using a simple caching system
		if (!this.query.getTenantRightsHasCache()) {
			this.store.setIsFetching(true);
			this.service
				.getUserSecurityRightsForTenant({
					// Remove this when the `me` call is ready
					userUuid: 'b5ababdc-a1cb-4224-9f1e-d919eda9bdeb',
				})
				.then(response => {
					this.store.setTenantRightsCache(true);
					this.store.setHasCache(true);
					this.store.setTenantRights(response._embedded);
				})
				.catch(err => this.store.setError(err))
				.finally(() => this.store.setIsFetching(false));
		}
	}

	public getMySiteSecurityRights(siteUuid: string, clearCache = false): void {
		if (clearCache) {
			this.store.setSiteRightsCache(false);
		}

		const state = this.query.getValue();
		const siteRights = state?.data?.siteRights;
		const currentSite = siteRights?.find(siteRight => siteRight.attributes.site === siteUuid);

		// Almost every module needs tenant or site security rights
		// We don't want to get the same information multiple times
		// Therefore we are using a simple caching system
		if (!currentSite || !this.query.getSiteRightsHasCache()) {
			this.store.setIsFetching(true);
			this.service
				.getUserSecurityRightsForSite({
					// Remove this when the `me` call is ready
					userUuid: 'b5ababdc-a1cb-4224-9f1e-d919eda9bdeb',
					siteUuid,
				})
				.then(response => {
					this.store.setSiteRightsCache(true);
					this.store.setHasCache(true);
					this.store.setSiteRights(response._embedded);
				})
				.catch(err => this.store.setError(err))
				.finally(() => this.store.setIsFetching(false));
		}
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
