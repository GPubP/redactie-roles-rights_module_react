import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { UserDetailModel, UserModel, UsersState } from './users.model';

@StoreConfig({ name: 'users', idKey: 'id' })
export class UsersStore extends BaseEntityStore<UsersState, UserModel> {
	constructor(initialState: Partial<UsersState>) {
		super(initialState);
	}

	public setIsFetchingUserRolesForTenant(isFetchingUserRolesForTenant = false): void {
		this.update({
			isFetchingUserRolesForTenant,
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

export const usersStore = new UsersStore({
	isFetchingUserRolesForTenant: false,
	isAddingUserToSite: false,
});
