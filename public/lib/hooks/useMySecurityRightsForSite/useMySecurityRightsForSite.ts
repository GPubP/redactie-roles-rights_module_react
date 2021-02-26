import { LoadingState, useObservable } from '@redactie/utils';
import { useEffect, useState } from 'react';
import { map } from 'rxjs/operators';

import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';
import { SecurityRightModel } from '../../store/securityRightsMatrix';

function useMySecurityRightsForSite(options: {
	siteUuid: string;
	module?: string;
	onlyKeys: true;
}): [LoadingState | null, string[]];
function useMySecurityRightsForSite(options: {
	siteUuid: string;
	module?: string;
	onlyKeys: false;
}): [LoadingState | null, MySecurityRightModel[]];
function useMySecurityRightsForSite(options: {
	siteUuid: string;
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[]];
function useMySecurityRightsForSite(options: {
	siteUuid: string;
	module?: string;
	onlyKeys: boolean;
}): [LoadingState | null, MySecurityRightModel[] | string[]] {
	const loading = useObservable(mySecurityRightsFacade.isFetchingSiteRights$, null);
	const [siteRights, setSiteRights] = useState<SecurityRightModel[] | string[]>([]);
	const error = useObservable(mySecurityRightsFacade.error$, null);
	const loadingState = error ? LoadingState.Error : loading;

	useEffect(() => {
		if (!options.siteUuid) {
			return;
		}

		const mySecurityRightsSubscription = mySecurityRightsFacade
			.selectSiteRightsByModule(options.siteUuid, options.module)
			.pipe(
				map(siteRights => {
					if (options.onlyKeys) {
						return siteRights.map(siteRight => siteRight.attributes.key);
					}
					return siteRights;
				})
			)
			.subscribe(setSiteRights);

		return () => {
			mySecurityRightsSubscription.unsubscribe();
		};
	}, [options.module, options.onlyKeys, options.siteUuid]);

	return [loadingState, siteRights];
}

export default useMySecurityRightsForSite;
