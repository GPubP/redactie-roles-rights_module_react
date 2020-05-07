import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserSchema } from '../../services/users';

export interface UserDetailGeneralProps extends RouteConfigComponentProps {
	user: UserSchema;
}
