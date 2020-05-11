import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialUsersState, UserModel, UsersState } from './users.model';

@StoreConfig({ name: 'users', idKey: 'uuid' })
export class UsersStore extends EntityStore<UsersState, UserModel> {
	constructor() {
		super(createInitialUsersState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}
}

export const usersStore = new UsersStore();
