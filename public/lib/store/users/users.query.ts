import { QueryEntity } from '@datorama/akita';

import { UsersState } from './users.model';
import { UsersStore, usersStore } from './users.store';

export class UsersQuery extends QueryEntity<UsersState> {
	constructor(protected store: UsersStore) {
		super(store);
	}

	public meta$ = this.select(state => state.meta);
	public site$ = this.select(state => state.site);
	public isFetching$ = this.select(state => state.isFetching);
}

export const usersQuery = new UsersQuery(usersStore);
