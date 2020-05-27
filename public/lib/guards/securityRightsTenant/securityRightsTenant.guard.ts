import { generatePath } from 'react-router-dom';
import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { MODULE_PATHS } from '../../roles.const';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsTenantGuardFunction } from './securityRightsTenant.guard.types';

const securityRightsTenantGuard: SecurityRightsTenantGuardFunction = (
	requiredSecurityRights = [],
	oneSecurityRight = false
) => async (to, from, next): Promise<void> => {
	try {
		await mySecurityRightsFacade.getMyTenantSecurityRights();

		mySecurityRightsQuery.tenantRights$.pipe(take(1)).subscribe(result => {
			const mySecurityRights = result.map(right => right.attributes.key);

			if (requiredSecurityRights.length === 0) {
				// no thing to check here
				next();
			}

			if (checkSecurityRights(mySecurityRights, requiredSecurityRights, oneSecurityRight)) {
				next();
			} else {
				// Change this with a redirect to a 403 page?
				next.redirect(generatePath(MODULE_PATHS.dashboard));
			}
		});
	} catch {
		// TODO: print tenant id in error message
		throw new Error('Tenant does not exist');
	}
};

export default securityRightsTenantGuard;
