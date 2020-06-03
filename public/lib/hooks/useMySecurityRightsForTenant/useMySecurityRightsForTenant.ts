import { useObservable } from '@mindspace-io/react';
import { map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

function useMySecurityRightsForTenant(onlyKeys: true): [LoadingState | null, string[]];
function useMySecurityRightsForTenant(
	onlyKeys: false
): [LoadingState | null, MySecurityRightModel[]];
function useMySecurityRightsForTenant(
	onlyKeys: boolean
): [LoadingState | null, MySecurityRightModel[] | string[]];
function useMySecurityRightsForTenant(
	onlyKeys: boolean
): [LoadingState | null, MySecurityRightModel[] | string[]] {
	const [loading] = useObservable(mySecurityRightsFacade.isFetching$, null);
	const [tenantRights] = useObservable(
		mySecurityRightsFacade.tenantRights$.pipe(
			map(tenantRights => {
				if (onlyKeys) {
					return tenantRights.map(tenantRight => tenantRight.attributes.key);
				}
				return tenantRights;
			})
		),
		[]
	);
	const [error] = useObservable(mySecurityRightsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	if (onlyKeys) {
		return [loadingState, tenantRights];
	}

	return [loadingState, tenantRights];
}

export default useMySecurityRightsForTenant;
