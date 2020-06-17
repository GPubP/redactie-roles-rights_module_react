import { LoadingState } from '../../roles.types';
import { UserModel, UsersMetaModel } from '../../store/users';

export type UseUsersFunctionReturnType = [
	LoadingState | null,
	UserModel[],
	UsersMetaModel | null | undefined
];

export type UseUsersFunction = () => UseUsersFunctionReturnType;
