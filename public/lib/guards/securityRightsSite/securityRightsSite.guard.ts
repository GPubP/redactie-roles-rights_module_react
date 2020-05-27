import { take } from 'rxjs/operators';

import { checkSecurityRights } from '../../helpers';
import { mySecurityRightsFacade, mySecurityRightsQuery } from '../../store/mySecurityRights';

import { SecurityRightsSiteGuardFunction } from './securityRightsSite.guard.types';

const securityRightsSiteGuard: SecurityRightsSiteGuardFunction = (
	urlSiteParam,
	requiredSecurityRights = [],
	oneSecurityRight = false
) => (to, from, next): void => {
	const siteUuid = to.match.params[urlSiteParam];

	mySecurityRightsFacade
		.getMySiteSecurityRights(siteUuid)
		.then(() => {
			mySecurityRightsQuery.siteRights$.pipe(take(1)).subscribe(result => {
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
			throw new Error(`Site ${siteUuid} does not exist`);
		});
};

export default securityRightsSiteGuard;
