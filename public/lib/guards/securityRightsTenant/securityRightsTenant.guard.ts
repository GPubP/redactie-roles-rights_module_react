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
		const tenantId = from?.match.params.tenantId || to.meta.tenantId;
		const result = await mySecurityRightsQuery.tenantRights$.pipe(take(1)).toPromise();
		const mySecurityRights = result.map(right => right.attributes.key);

		if (requiredSecurityRights.length === 0) {
			// no thing to check here
			next();
		}

		if (checkSecurityRights(mySecurityRights, requiredSecurityRights, oneSecurityRight)) {
			next();
		} else {
			const fromPathname = from?.location?.pathname;
			const hasRedirectURI = fromPathname !== to?.location?.pathname;
			next.redirect({
				pathname: generatePath(`/${tenantId}${MODULE_PATHS.forbidden403}`),
				search: hasRedirectURI ? `?redirect=${fromPathname}` : '',
			});
		}
	} catch {
		throw new Error('Tenant does not exist');
	}
};

export default securityRightsTenantGuard;
