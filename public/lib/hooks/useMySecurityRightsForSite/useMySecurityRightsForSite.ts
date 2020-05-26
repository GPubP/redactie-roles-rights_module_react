import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

const useMySecurityRightsForSite = (
	module?: string
): [LoadingState | null, MySecurityRightModel[] | undefined] => {
	const [loading] = useObservable(mySecurityRightsFacade.isFetching$, null);
	const [siteRights] = useObservable(mySecurityRightsFacade.selectSiteRightsByModule(module));
	const [error] = useObservable(mySecurityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, siteRights];
};

export default useMySecurityRightsForSite;
