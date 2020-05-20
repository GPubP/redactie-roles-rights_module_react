import { EntityState } from '@datorama/akita';

import { UserMetaResponse, UserResponse } from '../../services/users';
import { RoleModel } from '../roles';

export type UserModel = UserResponse;
export type UsersMetaModel = UserMetaResponse;

export interface UsersState extends EntityState<UserModel, string> {
	meta?: UsersMetaModel;
	user?: UserModel;
	userRoles?: RoleModel[];
	isFetching: boolean;
	isAddingUserToSite: boolean;
}

export const createInitialUsersState = (): UsersState => ({
	isFetching: false,
	isAddingUserToSite: false,
});
