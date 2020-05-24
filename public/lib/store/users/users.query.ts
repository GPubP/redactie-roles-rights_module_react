import { filterNil, QueryEntity } from '@datorama/akita';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';

import { UsersState } from './users.model';
import { UsersStore, usersStore } from './users.store';

export class UsersQuery extends QueryEntity<UsersState> {
	constructor(protected store: UsersStore) {
		super(store);
	}

	private convertBoolToLoadingState(bool: boolean): LoadingState {
		if (bool) {
			return LoadingState.Loading;
		}

		return LoadingState.Loaded;
	}

	public meta$ = this.select(state => state.meta).pipe(filterNil, distinctUntilChanged());
	public users$ = this.selectAll();
	public user$ = this.select(state => state.userDetail).pipe(filterNil, distinctUntilChanged());
	public userRolesForTenant$ = this.select(state => state.userDetail?.activeTenantRoles).pipe(
		filterNil,
		distinctUntilChanged()
	);
	public userRolesForSite$ = this.select(state => state.userDetail?.activeSiteRoles).pipe(
		filterNil,
		distinctUntilChanged()
	);

	// State
	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
	public isUpdating$ = this.select(state => state.isUpdating).pipe(
		map(this.convertBoolToLoadingState)
	);
	public isAddingUserToSite$ = this.select(state => state.isAddingUserToSite).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const usersQuery = new UsersQuery(usersStore);
