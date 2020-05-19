import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { RoleModel, securityRightsFacade } from '../../store/securityRights';

const useSecurityRights = (): [LoadingState | null, RoleModel[] | null | undefined] => {
	const [loading] = useObservable(securityRightsFacade.isFetching$, null);
	const [securityRights] = useObservable(securityRightsFacade.securityRights$, null);
	const [error] = useObservable(securityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, securityRights];
};

export default useSecurityRights;
