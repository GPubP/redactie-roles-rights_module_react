import { difference, intersection } from 'ramda';

import { CheckSecurityRightsFunction } from './checkSecurityRights.types';

const checkSecurityRights: CheckSecurityRightsFunction = (
	userSecurityRights: string[],
	requiredSecurityRights: string[],
	oneSecurityRight = false
): boolean => {
	if (oneSecurityRight) {
		return intersection(userSecurityRights, requiredSecurityRights).length > 0;
	}

	return difference(requiredSecurityRights, userSecurityRights).length === 0;
};

export default checkSecurityRights;
