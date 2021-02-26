import { BaseEntityState, Page } from '@redactie/utils';

import { UserResponse } from '../../services/users';
import { RoleModel } from '../roles';

export type UserModel = UserResponse;
export interface UserDetailModel extends UserModel {
	tenantRoles: RoleModel[];
	siteRoles: RoleModel[];
}
export type UsersMetaModel = Page;

export interface UsersState extends BaseEntityState<UserModel, string> {
	meta?: UsersMetaModel;
	userDetail?: UserDetailModel;
	isFetchingUserRolesForTenant: boolean;
	isAddingUserToSite: boolean;
}
