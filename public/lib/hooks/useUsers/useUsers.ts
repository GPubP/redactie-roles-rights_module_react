import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { UserModel, usersFacade, UsersMetaModel } from '../../store/users';

const useUsers = (): [LoadingState | null, UserModel[], UsersMetaModel | null | undefined] => {
	const [loading] = useObservable(usersFacade.isFetching$, null);
	const [users] = useObservable(usersFacade.users$, []);
	const [meta] = useObservable(usersFacade.meta$, null);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, users, meta];
};

export default useUsers;
