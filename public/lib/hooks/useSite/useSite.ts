import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { SiteDetail, sitesFacade } from '../../store/sites';

const useSite = (): [LoadingState | null, SiteDetail | null | undefined] => {
	const [loading] = useObservable(sitesFacade.isFetching$, null);
	const [site] = useObservable(sitesFacade.site$, null);
	const [error] = useObservable(sitesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, site];
};

export default useSite;
