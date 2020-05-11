import { Query } from '@datorama/akita';

import { UserState } from './user.model';
import { UserStore, userStore } from './user.store';

export class UserQuery extends Query<UserState> {
	constructor(protected store: UserStore) {
		super(store);
	}
	public user$ = this.select(state => state.user);
}

export const userQuery = new UserQuery(userStore);
