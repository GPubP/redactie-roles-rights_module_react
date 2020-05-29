import { generatePath } from 'react-router-dom';
import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { MODULE_PATHS } from '../../roles.const';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import {
	SecurityRightsTenantCanShownFunction,
	SecurityRightsTenantGuardFunction,
} from './securityRightsTenant.guard.types';

export const securityRightsTenantGuard: SecurityRightsTenantGuardFunction = (
	requiredSecurityRights = [],
	oneSecurityRight = false
) => async (to, from, next): Promise<void> => {
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
			next.redirect(generatePath(MODULE_PATHS.forbidden403));
		}
	} catch {
		throw new Error('Tenant does not exist');
	}
};

export const securityRightsTenantCanShowNavigation: SecurityRightsTenantCanShownFunction = (
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
