import { useObservable } from '@mindspace-io/react';

import { usersFacade } from '../../store/users/users.facade';

import { UsersLoadingStates } from './useUsersLoadingStates.types';

const useUsersLoadingState = (): UsersLoadingStates => {
	const [isFetching] = useObservable(usersFacade.isFetching$, null);
	const [isUpdating] = useObservable(usersFacade.isUpdating$, null);
	const [isAddingUserToSite] = useObservable(usersFacade.isAddingUserToSite$, null);

	return {
		isFetching,
		isUpdating,
		isAddingUserToSite,
	};
};

export default useUsersLoadingState;
