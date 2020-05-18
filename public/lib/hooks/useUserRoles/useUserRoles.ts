import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { usersFacade } from '../../store/users';

const useUserRoles = (
	uuid: string | null = null
): [LoadingState | null, RoleModel[] | undefined] => {
	const [loading] = useObservable(usersFacade.isFetching$, null);
	const [userRoles] = useObservable(usersFacade.userRoles$, []);
	const [error] = useObservable(usersFacade.error$, null);

	const loadingState = error || !uuid ? LoadingState.Error : loading;

	return [loadingState, userRoles];
};

export default useUserRoles;
