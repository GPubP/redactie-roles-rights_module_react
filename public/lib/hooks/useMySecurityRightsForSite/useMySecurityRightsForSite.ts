import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';
import { map } from 'rxjs/operators';

import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: true;
}): [LoadingState | null, string[]];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: false;
}): [LoadingState | null, MySecurityRightModel[]];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[]];
function useMySecurityRightsForSite(options: {
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[]] {
	const [loading] = useObservable(mySecurityRightsFacade.isFetchingSiteRights$, null);
	const [siteRights] = useObservable(
		mySecurityRightsFacade.selectSiteRightsByModule(options.module).pipe(
			map(siteRights => {
				if (options.onlyKeys) {
					return siteRights.map(tenantRight => tenantRight.attributes.key);
				}
				return siteRights;
			})
		),
		[]
	);
	const [error] = useObservable(mySecurityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, siteRights];
}

export default useMySecurityRightsForSite;
