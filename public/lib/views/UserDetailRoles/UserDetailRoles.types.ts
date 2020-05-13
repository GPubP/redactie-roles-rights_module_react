import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { RoleModel } from '../../store/roles';
import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
	userRoles: RoleModel[];
	roles: RoleModel[];
	onCancel: () => void;
	onSubmit: (user: UserModel, roles: RoleModel[] | null) => void;
}
