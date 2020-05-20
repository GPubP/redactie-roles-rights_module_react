import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialUsersState, UserModel, UsersState } from './users.model';

@StoreConfig({ name: 'users', idKey: 'id' })
export class UsersStore extends EntityStore<UsersState, UserModel> {
	constructor() {
		super(createInitialUsersState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}

	public setIsAddingUserToSite(isAddingUserToSite = false): void {
		this.update({
			isAddingUserToSite,
		});
	}
}

export const usersStore = new UsersStore();
