import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
}
