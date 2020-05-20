import { filterNil, QueryEntity } from '@datorama/akita';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

import { SitesState } from './sites.model';
import { SitesStore, sitesStore } from './sites.store';

export class SitesQuery extends QueryEntity<SitesState> {
	constructor(protected store: SitesStore) {
		super(store);
	}

	private convertBoolToLoadingState(bool: boolean): LoadingState {
		if (bool) {
			return LoadingState.Loading;
		}

		return LoadingState.Loaded;
	}

	// Data
	public sites$ = this.selectAll();
	public site$ = this.select(state => state.site).pipe(filterNil, distinctUntilChanged());

	// State
	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const sitesQuery = new SitesQuery(sitesStore);
