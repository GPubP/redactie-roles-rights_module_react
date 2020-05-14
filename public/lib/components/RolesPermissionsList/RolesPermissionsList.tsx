import { Card, CardBody, CardTitle } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import './RolesPermissionsList.scss';
import { RolePermission, RolesPermissionsProps } from './RolesPermissionsList.types';

const RolesPermissionsList: React.FC<RolesPermissionsProps> = ({ roles, permissions }) => {
	return (
		<Card className="col-xs-12 col-sm-8 u-margin-left">
			<CardBody>
				<CardTitle>Module Titel</CardTitle>
				<table className="m-table">
					<tr className="m-table--header">
						<th></th>
						{roles.map((role: RolePermission) => (
							<th key={role.id} className="a-table-header--top">
								{role.name}
							</th>
						))}
						<th></th>
					</tr>
					{permissions.map((permission: RolePermission) => (
						<tr key={permission.id}>
							<th className="a-table-header--side">{permission.name}</th>
							{roles.map((role: RolePermission) => (
								<td key={role.id}>
									<p>Checkbox</p>
								</td>
							))}
							<td></td>
						</tr>
					))}
				</table>
			</CardBody>
		</Card>
	);
};

export default RolesPermissionsList;
