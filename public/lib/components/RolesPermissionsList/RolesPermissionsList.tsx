import { Card, CardBody, CardTitle, Checkbox } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import './RolesPermissionsList.scss';
import { RoleResponse, SecurityRightResponse } from '../../services/securityRights';

import { RolesPermissionsProps } from './RolesPermissionsList.types';

const RolesPermissionsList: FC<RolesPermissionsProps> = ({ roles, permissions }) => {
	let formState: Array<string>;

	const handleFormSubmit = (): void => {
		console.log('check');
	};

	return (
		//formik wrappen
		// initialValues = per roleId een veld
		<Card>
			<CardBody>
				<CardTitle>Module Titel</CardTitle>
				<table className="m-table">
					<tr className="m-table--header">
						<th></th>
						{roles?.map((role: RoleResponse) => (
							<th key={role.role.id} className="a-table-header--top">
								{role.role.name}
							</th>
						))}
						<th></th>
					</tr>
					{permissions?.map((permission: SecurityRightResponse) => (
						<tr key={permission.id}>
							<th className="a-table-header--side">{permission.name}</th>
							{roles?.map((role: RoleResponse) => (
								<td className="a-table-checkbox" key={role.role.id}>
									<Formik initialValues={formState} onSubmit={handleFormSubmit}>
										<Field as={Checkbox} />
									</Formik>
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
