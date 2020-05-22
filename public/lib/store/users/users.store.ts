import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialUsersState, UserDetailModel, UserModel, UsersState } from './users.model';

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

	public setIsUpdating(isUpdating = false): void {
		this.update({
			isUpdating,
		});
	}

	public setIsAddingUserToSite(isAddingUserToSite = false): void {
		this.update({
			isAddingUserToSite,
		});
	}

	public setUserDetail(userDetail: Partial<UserDetailModel>): void {
		this.update(state => ({
			...state,
			userDetail: {
				...state.userDetail,
				...userDetail,
			},
		}));
	}
}

export const usersStore = new UsersStore();
