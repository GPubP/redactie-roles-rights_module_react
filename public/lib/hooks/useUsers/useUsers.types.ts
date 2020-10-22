import { LoadingState } from '@redactie/utils';

import { UserModel, UsersMetaModel } from '../../store/users';

export type UseUsersFunctionReturnType = [
	LoadingState | null,
	UserModel[],
	UsersMetaModel | null | undefined
];

export type UseUsersFunction = () => UseUsersFunctionReturnType;
