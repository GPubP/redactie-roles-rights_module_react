import { generatePath } from 'react-router-dom';
import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { MODULE_PATHS } from '../../roles.const';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsSiteGuardFunction } from './securityRightsSite.guard.types';

const securityRightsSiteGuard: SecurityRightsSiteGuardFunction = (
	urlSiteParam,
	requiredSecurityRights = [],
	oneSecurityRight = false
) => async (to, from, next): Promise<void> => {
	const siteUuid = to.match.params[urlSiteParam];

	try {
		await mySecurityRightsFacade.getMySiteSecurityRights(siteUuid);
		mySecurityRightsQuery.siteRights$.pipe(take(1)).subscribe(result => {
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
		});
	} catch {
		throw new Error(`Site ${siteUuid} does not exist`);
	}
};

export default securityRightsSiteGuard;
