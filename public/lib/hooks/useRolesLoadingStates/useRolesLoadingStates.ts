import { useObservable } from '@mindspace-io/react';

import { rolesFacade } from '../../store/roles';

import { RolesLoadingStates } from './useRolesLoadingStates.types';

const useSitesLoadingState = (): RolesLoadingStates => {
	const [isCreatingSiteRole] = useObservable(rolesFacade.isCreatingSiteRole$, null);
	const [isFetchingSiteRoles] = useObservable(rolesFacade.isFetchingSiteRoles$, null);
	const [isUpdatingSiteRole] = useObservable(rolesFacade.isUpdatingSiteRole$, null);

	return {
		isCreatingSiteRole,
		isFetchingSiteRoles,
		isUpdatingSiteRole,
	};
};

export default useSitesLoadingState;
