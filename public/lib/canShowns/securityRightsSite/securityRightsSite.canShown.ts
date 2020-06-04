import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsSiteCanShownFunction } from './securityRightsSite.canShown.types';

const securityRightsSiteCanShown: SecurityRightsSiteCanShownFunction = (
	urlSiteParam,
	requiredSecurityRights = [],
	oneSecurityRight = false
) => async (props, next): Promise<void> => {
	const siteUuid = props[urlSiteParam] as string;

	try {
		await mySecurityRightsFacade.getMySiteSecurityRights(siteUuid);
		const result = await mySecurityRightsQuery.siteRights$.pipe(take(1)).toPromise();
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

export default securityRightsSiteCanShown;
