import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { RoleModel, rolesFacade } from '../../store/roles';

const useRolesTwo = (): [LoadingState | null, RoleModel[] | null | undefined] => {
	const [loading] = useObservable(rolesFacade.isFetching$, null);
	const [roles] = useObservable(rolesFacade.roles$, null);
	const [error] = useObservable(rolesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, roles];
};

export default useRolesTwo;
