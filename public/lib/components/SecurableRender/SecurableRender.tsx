import React, { FC } from 'react';

import { checkSecurityRights } from '../../helpers';

import { SecurableRenderProps } from './SecurableRender.types';

const SecurableRender: FC<SecurableRenderProps> = ({
	userSecurityRights,
	requiredSecurityRights,
	oneSecurityRight = false,
	renderOtherwise,
	children,
}) => {
	if (checkSecurityRights(userSecurityRights, requiredSecurityRights, oneSecurityRight)) {
		return <>{children}</>;
	} else if (renderOtherwise) {
		return <>{renderOtherwise}</>;
	}

	return null;
};

export default SecurableRender;
