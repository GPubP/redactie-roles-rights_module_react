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
	const tenantId = from?.match.params.tenantId || to.meta.tenantId;

	try {
		await mySecurityRightsFacade.getMySiteSecurityRights(siteUuid);
		mySecurityRightsQuery
			.siteRights$(siteUuid)
			.pipe(take(1))
			.subscribe(result => {
				const mySecurityRights = result.map(right => right.attributes.key);

				if (requiredSecurityRights.length === 0) {
					// Nothing to check here
					return next();
				}

				if (
					checkSecurityRights(mySecurityRights, requiredSecurityRights, oneSecurityRight)
				) {
					return next();
				}
				const fromPathname = from?.location?.pathname;
				const hasRedirectURI = fromPathname !== to?.location?.pathname;

				next.redirect({
					pathname: generatePath(`/${tenantId}${MODULE_PATHS.forbidden403}`),
					search: hasRedirectURI ? `?redirect=${fromPathname}` : '',
				});
			});
	} catch {
		throw new Error(`Site ${siteUuid} does not exist`);
	}
};

export default securityRightsSiteGuard;
