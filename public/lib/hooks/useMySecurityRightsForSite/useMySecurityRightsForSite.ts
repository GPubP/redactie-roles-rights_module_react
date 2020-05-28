import { useObservable } from '@mindspace-io/react';
import { map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: true;
}): [LoadingState | null, string[] | undefined];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: false;
}): [LoadingState | null, MySecurityRightModel[] | undefined];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[] | undefined];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[] | undefined] {
	const [loading] = useObservable(mySecurityRightsFacade.isFetching$, null);
	const [siteRights] = useObservable(
		mySecurityRightsFacade.selectSiteRightsByModule(options.module).pipe(
			map(siteRights => {
				if (options.onlyKeys) {
					return siteRights.map(tenantRight => tenantRight.attributes.key);
				}
				return siteRights;
			})
		)
	);
	const [error] = useObservable(mySecurityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, siteRights];
}

export default useMySecurityRightsForSite;
