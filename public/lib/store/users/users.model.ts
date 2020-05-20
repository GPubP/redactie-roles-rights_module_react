import { EntityState } from '@datorama/akita';

import { UserMetaResponse, UserResponse } from '../../services/users';
import { RoleModel } from '../roles';

export type UserModel = UserResponse;
export interface UserDetailModel extends UserModel {
	activeTenantRoles: RoleModel[];
	activeSiteRoles: RoleModel[];
}
export type UsersMetaModel = UserMetaResponse;

export interface UsersState extends EntityState<UserModel, string> {
	meta?: UsersMetaModel;
	userDetail?: UserDetailModel;
	isFetching: boolean;
	isUpdating: boolean;
	isAddingUserToSite: boolean;
}

export const createInitialUsersState = (): UsersState => ({
	isFetching: false,
	isUpdating: false,
	isAddingUserToSite: false,
});
