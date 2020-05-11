import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserModel } from '../../store/users';

export interface UserDetailGeneralProps extends RouteConfigComponentProps {
	user: UserModel;
}
