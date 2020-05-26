import { filterNil, Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

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
	public siteRights$ = this.data$.pipe(
		map(data => data.siteRights),
		filterNil,
		distinctUntilChanged()
	);

	// State
	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);

	public getTenantRightsHasCache(): boolean {
		return this.store.tenantRightsCache.value;
	}

	public getSiteRightsHasCache(): boolean {
		return this.store.siteRightsCache.value;
	}

	public selectSiteRightsByModule(module: string): Observable<MySecurityRightModel[]> {
		return this.siteRights$.pipe(
			map(siteRights =>
				siteRights.filter(siteRight => siteRight.attributes.module === module)
			)
		);
	}
}

export const mySecurityRightsQuery = new MySecurityRightsQuery(mySecurityRightsStore);
