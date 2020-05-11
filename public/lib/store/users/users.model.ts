import { EntityState } from '@datorama/akita';

import { UserMetaResponse, UserResponse } from '../../services/users';

export type UserModel = UserResponse;
export type UsersMetaModel = UserMetaResponse;

export interface UsersState extends EntityState<UserModel, string> {
	meta?: UsersMetaModel;
	user?: UserModel;
	isFetching: boolean;
	isCreating: boolean;
	isUpdating: boolean;
	isActivating: boolean;
}

export const createInitialUsersState = (): UsersState => ({
	loading: false,
	isFetching: false,
	isCreating: false,
	isUpdating: false,
	isActivating: false,
});
