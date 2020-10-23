import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { RoleModel, rolesFacade } from '../../store/roles';

const useSiteRole = (): [LoadingState | null, RoleModel | null | undefined] => {
	const [loading] = useObservable(rolesFacade.isFetchingSiteRoles$, null);
	const [role] = useObservable(rolesFacade.siteRole$, null);
	const [error] = useObservable(rolesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, role];
};

export default useSiteRole;
