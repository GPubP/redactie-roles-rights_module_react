import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsTenantCanShownFunction } from './securityRightsTenant.canShown.types';

const securityRightsTenantCanShown: SecurityRightsTenantCanShownFunction = (
	requiredSecurityRights = [],
	oneSecurityRight = false
) => async (props, next): Promise<void> => {
	try {
		await mySecurityRightsFacade.getMyTenantSecurityRights();
		const result = await mySecurityRightsQuery.tenantRights$.pipe(take(1)).toPromise();
		const mySecurityRights = result.map(right => right.attributes.key);

		if (requiredSecurityRights.length === 0) {
			// no thing to check here
			next();
		}

		if (checkSecurityRights(mySecurityRights, requiredSecurityRights, oneSecurityRight)) {
			next();
		} else {
			throw new Error('No permission to see navigation item');
		}
	} catch (err) {
		throw new Error(err);
	}
};

export default securityRightsTenantCanShown;
