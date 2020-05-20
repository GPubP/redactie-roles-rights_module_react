import { QueryEntity } from '@datorama/akita';
import { isNil } from 'ramda';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

import { SecurityRightsState } from './securityRights.model';
import { securityRightsStore, SecurityRightsStore } from './securityRights.store';

export class SecurityRightsQuery extends QueryEntity<SecurityRightsState> {
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
	public securityRights$ = this.select(state => state.securityRights);
	public modules$ = this.select(state => state.modules);
	public roles$ = this.select(state => state.roles);

	// State
	public error$ = this.selectError().pipe(filter(error => !isNil(error), distinctUntilChanged()));
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const securityRightsQuery = new SecurityRightsQuery(securityRightsStore);
