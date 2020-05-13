import { Card, CardBody, CardTitle } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import './RolesPermissionsList.scss';

const RolesPermissionsList: FC = () => {
	return (
		<Card className="col-xs-12 col-sm-8 u-margin-left">
			<CardBody>
				<CardTitle>Module Titel</CardTitle>
				<table>
					<div className="m-table-header">
						<th>
							<td>Rol</td>
						</th>
					</div>
				</table>
			</CardBody>
		</Card>
	);
};

export default RolesPermissionsList;
