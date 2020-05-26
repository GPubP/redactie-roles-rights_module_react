import { useObservable } from '@mindspace-io/react';
import { map } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { MySecurityRightModel, mySecurityRightsFacade } from '../../store/mySecurityRights';

const useMySecurityRightsForTenant = (
	onlyKeys = true
): [LoadingState | null, MySecurityRightModel[] | string[] | undefined] => {
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

	return [loadingState, tenantRights];
};

export default useMySecurityRightsForTenant;
