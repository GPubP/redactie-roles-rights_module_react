import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { RolesModel } from '../../store/roles';
import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
	roles: RolesModel;
	onCancel: () => void;
	onSubmit: (user: UserModel, roles: RolesModel) => void;
}
