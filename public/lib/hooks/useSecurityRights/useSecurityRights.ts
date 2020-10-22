import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import {
	SecurityRightMatrixModel,
	securityRightsMatrixFacade,
} from '../../store/securityRightsMatrix';

const useSecurityRights = (): [
	LoadingState | null,
	LoadingState | null,
	SecurityRightMatrixModel | null
] => {
	const [isFetching] = useObservable(securityRightsMatrixFacade.isFetching$, null);
	const [isUpdating] = useObservable(securityRightsMatrixFacade.isUpdating$, null);
	const [securityRightMatrix] = useObservable(securityRightsMatrixFacade.data$, null);
	const [error] = useObservable(securityRightsMatrixFacade.error$, null);

	return [error ? LoadingState.Error : isFetching, isUpdating, securityRightMatrix];
};

export default useSecurityRights;
