import { filterNil, Query } from '@datorama/akita';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

import { SecurityRightsState } from './securityRightsMatrix.model';
import { securityRightsStore, SecurityRightsStore } from './securityRightsMatrix.store';

export class SecurityRightsQuery extends Query<SecurityRightsState> {
	constructor(protected store: SecurityRightsStore) {
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

	// State
	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
	public isUpdating$ = this.select(state => state.isUpdating).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const securityRightsQuery = new SecurityRightsQuery(securityRightsStore);
