import { filterNil, Query } from '@datorama/akita';
import { LoadingState } from '@redactie/utils';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { SecurityRightsMatrixState } from './securityRightsMatrix.model';
import { securityRightsMatrixStore, SecurityRightsMatrixStore } from './securityRightsMatrix.store';

export class SecurityRightsMatrixQuery extends Query<SecurityRightsMatrixState> {
	constructor(protected store: SecurityRightsMatrixStore) {
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

export const securityRightsMatrixQuery = new SecurityRightsMatrixQuery(securityRightsMatrixStore);
