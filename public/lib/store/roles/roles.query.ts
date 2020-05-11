import { QueryEntity } from '@datorama/akita';

import { RolesState } from './roles.model';
import { rolesStore, RolesStore } from './roles.store';

export class RolesQuery extends QueryEntity<RolesState> {
	constructor(protected store: RolesStore) {
		super(store);
	}

	public meta$ = this.select(state => state.meta);
	public user$ = this.select(state => state.user);
	public isFetching$ = this.select(state => state.isFetching);
}

export const usersQuery = new RolesQuery(rolesStore);
