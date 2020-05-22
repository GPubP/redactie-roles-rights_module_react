import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { UserModel, usersFacade } from '../../store/users';

const useUser = (
	uuid: string | null = null
): [LoadingState | null, UserModel | null | undefined] => {
	const [loading] = useObservable(usersFacade.isFetching$, null);
	const [user] = useObservable(usersFacade.user$, null);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error || !uuid ? LoadingState.Error : loading;

	return [loadingState, user];
};

export default useUser;
