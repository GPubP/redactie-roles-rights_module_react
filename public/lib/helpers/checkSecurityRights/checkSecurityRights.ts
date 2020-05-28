import { difference, intersection } from 'ramda';

const checkSecurityRights = (
	userSecurityRights: string[],
	requiredSecurityRights: string[],
	oneSecurityRight: boolean
): boolean => {
	if (oneSecurityRight) {
		return intersection(userSecurityRights, requiredSecurityRights).length > 0;
	}

	return difference(requiredSecurityRights, userSecurityRights).length === 0;
};

export default checkSecurityRights;
