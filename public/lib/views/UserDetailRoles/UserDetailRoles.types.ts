import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ContentType } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
	userRoles: RoleModel[];
	roles: RoleModel[];
	onCancel: () => void;
	onSubmit: (user: UserModel, roles: Array<string>, contentType: ContentType) => void;
}
