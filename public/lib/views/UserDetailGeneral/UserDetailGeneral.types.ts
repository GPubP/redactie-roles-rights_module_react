import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserRolesSchema } from '../../services/user';

export interface UserDetailGeneralProps extends RouteConfigComponentProps {
	user: UserRolesSchema;
}
