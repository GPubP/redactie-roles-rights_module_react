import { useObservable } from '@mindspace-io/react';

import { LoadingState } from '../../roles.types';
import { SiteModel, sitesFacade } from '../../store/sites';

const useSites = (): [LoadingState | null, SiteModel[] | null | undefined] => {
	const [loading] = useObservable(sitesFacade.isFetching$, null);
	const [sites] = useObservable(sitesFacade.sites$, null);
	const [error] = useObservable(sitesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, sites];
};

export default useSites;
