import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { RoleModel } from '../../store/roles';
import { usersFacade } from '../../store/users';

const useUserRolesForTenant = (
	uuid: string | null = null
): [LoadingState | null, RoleModel[] | undefined] => {
	const [loading] = useObservable(
		usersFacade.isFetchingUserRolesForTenant$,
		LoadingState.Loading
	);
	const [userRolesForTenant] = useObservable(usersFacade.userRolesForTenant$, []);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error || !uuid ? LoadingState.Error : loading;

	return [loadingState, userRolesForTenant];
};

export default useUserRolesForTenant;
