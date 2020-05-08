import { Card } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { UserDetailGeneralProps } from './UserDetailGeneral.types';

const UserDetailGeneral: FC<UserDetailGeneralProps> = ({ user }) => {
	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Algemeen</h5>
				<div className="row u-margin-top">
					<div className="col-xs-12 ">
						<span>Naam</span>
						<p className="u-margin-top-xs">
							<span className="u-text-light u-margin-right-xs">
								{user.user.lastname}
							</span>
						</p>
					</div>
				</div>
				<div className="row u-margin-top">
					<div className="col-xs-12 ">
						<span>Voornaam</span>
						<p className="u-margin-top-xs">
							<span className="u-text-light u-margin-right-xs">
								{user.user.firstname}
							</span>
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default UserDetailGeneral;
