import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserRolesSchema } from '../../services/user';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserRolesSchema;
}
