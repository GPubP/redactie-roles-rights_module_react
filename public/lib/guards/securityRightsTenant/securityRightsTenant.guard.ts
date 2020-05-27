import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsTenantGuardFunction } from './securityRightsTenant.guard.types';

const securityRightsTenantGuard: SecurityRightsTenantGuardFunction = (
	requiredSecurityRights = [],
	oneSecurityRight = false
) => (to, from, next): void => {
	mySecurityRightsFacade
		.getMyTenantSecurityRights()
		.then(() => {
			mySecurityRightsQuery.tenantRights$.pipe(take(1)).subscribe(result => {
				const mySecurityRights = result.map(right => right.attributes.key);

				if (requiredSecurityRights.length === 0) {
					// no thing to check here
					next();
				}

				if (
					checkSecurityRights(mySecurityRights, requiredSecurityRights, oneSecurityRight)
				) {
					next();
				} else {
					// Change this with a redirect to a 404 page?
					throw new Error(
						`You do not have the permissions the view this route. The following securityrights are required : ${JSON.stringify(
							requiredSecurityRights
						)}`
					);
				}
			});
		})
		.catch(() => {
			throw new Error('Could not fetch the tenant security rights of the current user');
		});
};

export default securityRightsTenantGuard;
