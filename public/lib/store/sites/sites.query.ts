import { QueryEntity } from '@datorama/akita';
import { isNil } from 'ramda';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

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

	// State
	public error$ = this.selectError().pipe(filter(error => !isNil(error), distinctUntilChanged()));
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const sitesQuery = new SitesQuery(sitesStore);
