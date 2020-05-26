import { difference, intersection } from 'ramda';
import React, { FC } from 'react';

import { SecurableRenderProps } from './SecurableRender.types';

const SecurableRender: FC<SecurableRenderProps> = ({
	userSecurityRights,
	requiredSecurityRights,
	oneSecurityRight = false,
	renderOtherwise,
	children,
}) => {
	const checkSecurityRights = (): boolean => {
		if (oneSecurityRight) {
			return intersection(userSecurityRights, requiredSecurityRights).length > 0;
		}

		return difference(requiredSecurityRights, userSecurityRights).length === 0;
	};

	if (!children || !userSecurityRights || !requiredSecurityRights) {
		return null;
	}

	if (checkSecurityRights()) {
		return <>{children}</>;
	} else if (renderOtherwise) {
		return <>{renderOtherwise}</>;
	}

	return null;
};

export default SecurableRender;
