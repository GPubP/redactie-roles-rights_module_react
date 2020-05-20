import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { usersFacade } from '../../store/users';

const useUserRolesForSite = (): [LoadingState | null, RoleModel[] | undefined] => {
	const [loading] = useObservable(usersFacade.isFetching$, null);
	const [userRolesForTenant] = useObservable(usersFacade.userRolesForSite$, []);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, userRolesForTenant];
};

export default useUserRolesForSite;
