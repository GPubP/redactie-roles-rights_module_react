import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import {
	SecurityRightMatrixModel,
	securityRightsMatrixFacade,
} from '../../store/securityRightsMatrix';

const useSecurityRights = (): [LoadingState | null, SecurityRightMatrixModel | null] => {
	const [loading] = useObservable(securityRightsMatrixFacade.isFetching$, null);
	const [securityRightMatrix] = useObservable(securityRightsMatrixFacade.data$, null);
	const [error] = useObservable(securityRightsMatrixFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, securityRightMatrix];
};

export default useSecurityRights;
