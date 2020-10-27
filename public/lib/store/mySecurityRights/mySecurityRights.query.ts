import { filterNil, Query } from '@datorama/akita';
import { LoadingState } from '@redactie/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { SecurityRightResponse } from '../../services/securityRights/securityRights.service.types';

import { MySecurityRightModel, MySecurityRightsState } from './mySecurityRights.model';
import { MySecurityRightsStore, mySecurityRightsStore } from './mySecurityRights.store';

export class MySecurityRightsQuery extends Query<MySecurityRightsState> {
	constructor(protected store: MySecurityRightsStore) {
		super(store);
	}

	private convertBoolToLoadingState(bool: boolean): LoadingState {
		if (bool) {
			return LoadingState.Loading;
		}

		return LoadingState.Loaded;
	}

	// Data
	public data$ = this.select(state => state.data).pipe(filterNil, distinctUntilChanged());
	public tenantRights$ = this.data$.pipe(
		map(data => data.tenantRights),
		filterNil,
		distinctUntilChanged()
	);
	public siteRights$ = (siteUuid: string): Observable<SecurityRightResponse[]> =>
		this.select(state => ({
			siteRights: state.data.siteRights,
		})).pipe(
			filter(() => this.store.siteRightsCache.siteUuid === siteUuid),
			map(data => data.siteRights),
			filterNil,
			distinctUntilChanged()
		);

	// State
	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
	public isFetchingTenantRights$ = this.select(state => state.isFetchingTenantRights).pipe(
		map(this.convertBoolToLoadingState)
	);
	public isFetchingSiteRights$ = this.select(state => state.isFetchingSiteRights).pipe(
		map(this.convertBoolToLoadingState)
	);

	public getIsFetchingTenantRights(): boolean {
		const value = this.store.getValue();
		return value ? value.isFetchingTenantRights : false;
	}

	public getIsFetchingSiteRights(): boolean {
		const value = this.store.getValue();
		return value ? value.isFetchingSiteRights : false;
	}

	public getTenantRightsHasCache(): boolean {
		return this.store.tenantRightsCache.value;
	}

	public getSiteRightsHasCache(): boolean {
		return this.store.siteRightsCache.active.value;
	}

	public getSiteRightsCacheSiteUuid(): string | undefined {
		return this.store.siteRightsCache.siteUuid;
	}

	public selectSiteRightsByModule(
		siteUuid: string,
		module: string
	): Observable<MySecurityRightModel[]> {
		return this.siteRights$(siteUuid).pipe(
			map(siteRights =>
				siteRights.filter(siteRight => siteRight.attributes.module === module)
			)
		);
	}
}

export const mySecurityRightsQuery = new MySecurityRightsQuery(mySecurityRightsStore);
