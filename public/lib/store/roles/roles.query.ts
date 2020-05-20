import { QueryEntity } from '@datorama/akita';
import { isNil } from 'ramda';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

import { RolesState } from './roles.model';
import { rolesStore, RolesStore } from './roles.store';

export class RolesQuery extends QueryEntity<RolesState> {
	constructor(protected store: RolesStore) {
		super(store);
	}

	private convertBoolToLoadingState(bool: boolean): LoadingState {
		if (bool) {
			return LoadingState.Loading;
		}

		return LoadingState.Loaded;
	}

	// Data
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public roles$ = this.selectAll();

	// State
	public error$ = this.selectError().pipe(filter(error => !isNil(error), distinctUntilChanged()));
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const rolesQuery = new RolesQuery(rolesStore);
