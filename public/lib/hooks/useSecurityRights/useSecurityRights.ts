import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { SecurityRightMatrixModel, securityRightsFacade } from '../../store/securityRightsMatrix';

const useSecurityRights = (): [LoadingState | null, SecurityRightMatrixModel | null] => {
	const [loading] = useObservable(securityRightsFacade.isFetching$, null);
	const [securityRightMatrix] = useObservable(securityRightsFacade.data$, null);
	const [error] = useObservable(securityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, securityRightMatrix];
};

export default useSecurityRights;
