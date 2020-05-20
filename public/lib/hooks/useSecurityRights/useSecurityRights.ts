import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import {
	ModuleModel,
	RoleModel,
	SecurityRightModel,
	securityRightsFacade,
} from '../../store/securityRights';

const useSecurityRights = (): [
	LoadingState | null,
	SecurityRightModel[] | null | undefined,
	RoleModel[] | null | undefined,
	ModuleModel[] | null | undefined
] => {
	const [loading] = useObservable(securityRightsFacade.isFetching$, null);
	const [securityRights] = useObservable(securityRightsFacade.securityRights$, null);
	const [roles] = useObservable(securityRightsFacade.roles$, null);
	const [modules] = useObservable(securityRightsFacade.modules$, null);
	const [error] = useObservable(securityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, securityRights, roles, modules];
};

export default useSecurityRights;
