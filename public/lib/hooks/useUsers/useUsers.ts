import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { usersFacade } from '../../store/users';

import { UseUsersFunctionReturnType } from './useUsers.types';

const useUsers = (): UseUsersFunctionReturnType => {
	const [loading] = useObservable(usersFacade.isFetching$, null);
	const [users] = useObservable(usersFacade.users$, []);
	const [meta] = useObservable(usersFacade.meta$, null);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, users, meta];
};

export default useUsers;
