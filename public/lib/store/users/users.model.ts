import { EntityState } from '@datorama/akita';

import { Page } from '../../roles.types';
import { UserResponse } from '../../services/users';
import { RoleModel } from '../roles';

export type UserModel = UserResponse;
export interface UserDetailModel extends UserModel {
	tenantRoles: RoleModel[];
	siteRoles: RoleModel[];
}
export type UsersMetaModel = Page;

export interface UsersState extends EntityState<UserModel, string> {
	meta?: UsersMetaModel;
	userDetail?: UserDetailModel;
	isFetching: boolean;
	isFetchingOne: boolean;
	isFetchingUserRolesForTenant: boolean;
	isUpdating: boolean;
	isAddingUserToSite: boolean;
}

export const createInitialUsersState = (): UsersState => ({
	isFetching: false,
	isFetchingOne: false,
	isUpdating: false,
	isFetchingUserRolesForTenant: false,
	isAddingUserToSite: false,
});
