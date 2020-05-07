import { Card } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { UserDetailGeneralProps } from './UserDetailGeneral.types';

const UserDetailGeneral: FC<UserDetailGeneralProps> = () => {
	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Algemeen</h5>
			</div>
		</Card>
	);
};

export default UserDetailGeneral;
