import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { RoleModel, rolesFacade } from '../../store/roles';

const useTenantRoles = (): [LoadingState | null, RoleModel[] | null | undefined] => {
	const [loading] = useObservable(rolesFacade.isFetchingTenantRoles$, null);
	const [roles] = useObservable(rolesFacade.tenantRoles$, null);
	const [error] = useObservable(rolesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, roles];
};

export default useTenantRoles;
