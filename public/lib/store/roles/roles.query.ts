import { QueryEntity } from '@datorama/akita';

import { RolesState } from './roles.model';
import { RolesStore, rolesStore } from './roles.store';

export class RolesQuery extends QueryEntity<RolesState> {
	constructor(protected store: RolesStore) {
		super(store);
	}

	public securityRight$ = this.select(state => state.securityRight);
	public role$ = this.select(state => state.role);
	public module$ = this.select(state => state.module);
	public isFetching$ = this.select(state => state.isFetching);
}

export const rolesQuery = new RolesQuery(rolesStore);
