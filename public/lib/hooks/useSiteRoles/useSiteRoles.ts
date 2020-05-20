import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { RoleModel, rolesFacade } from '../../store/roles';

const useSiteRoles = (): [LoadingState | null, RoleModel[] | null | undefined] => {
	const [loading] = useObservable(rolesFacade.isFetchingSiteRoles$, null);
	const [roles] = useObservable(rolesFacade.siteRoles$, null);
	const [error] = useObservable(rolesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, roles];
};

export default useSiteRoles;
