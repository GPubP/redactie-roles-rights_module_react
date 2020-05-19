import { QueryEntity } from '@datorama/akita';
import { isNil } from 'ramda';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

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

	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public users$ = this.selectAll();
	public user$ = this.select(state => state.user).pipe(
		filter(user => !isNil(user), distinctUntilChanged())
	);
	public userRoles$ = this.select(state => state.userRoles).pipe(
		filter(user => !isNil(user), distinctUntilChanged())
	);

	// State
	public error$ = this.selectError().pipe(filter(error => !isNil(error), distinctUntilChanged()));
	public isFetching$ = this.select(state => state.isFetching).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const usersQuery = new UsersQuery(usersStore);
