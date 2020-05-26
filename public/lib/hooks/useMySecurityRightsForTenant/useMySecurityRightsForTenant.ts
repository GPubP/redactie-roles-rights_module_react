import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

const useMySecurityRightsForTenant = (): [
	LoadingState | null,
	MySecurityRightModel[] | undefined
] => {
	const [loading] = useObservable(mySecurityRightsFacade.isFetching$, null);
	const [tenantRights] = useObservable(mySecurityRightsFacade.tenantRights$, []);
	const [error] = useObservable(mySecurityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, tenantRights];
};

export default useMySecurityRightsForTenant;
