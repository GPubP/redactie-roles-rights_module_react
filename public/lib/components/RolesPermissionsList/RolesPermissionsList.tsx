/* eslint-disable prettier/prettier */
import { Card, CardBody, CardTitle, Checkbox } from '@acpaas-ui/react-components';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC, ReactNode } from 'react';

import './RolesPermissionsList.scss';
import { RoleResponse, SecurityRightResponse } from '../../services/securityRights';
import { RoleSecurityRight } from '../../views/RolesOverview/RolesOverview.types';

import { RolesPermissionsProps } from './RolesPermissionsList.types';

const RolesPermissionsList: FC<RolesPermissionsProps> = ({
	roles,
	permissions,
	formState,
	readonly = false,
	title,
	onChange,
}) => {
	const renderSecurityRightsRows = (
		securityRights: SecurityRightResponse[],
		submitForm: any,
		values: any
	): ReactNode => {
		return securityRights.map((securityRight: SecurityRightResponse) => {
			return (
				<tr key={securityRight.id}>
					<td className="a-table-header--side">{securityRight.name}</td>
					<FieldArray
						// Names are made out of dots, to avoid that formik creates a nested structure we have added this funky fieldname:
						// https://github.com/italodeandra/formik/blob/patch-1/docs/guides/arrays.md
						name={`['${securityRight.id}']`}
						render={arrayHelpers =>
							roles?.map((role: RoleResponse) => {
								return (
									<td
										className="a-table-checkbox"
										key={`${securityRight.id}_${role.role.id}`}
									>
										<Field
											as={Checkbox}
											checked={
												values[securityRight.id] &&
												values[securityRight.id].includes(role.role.id)
											}
											disabled={readonly}
											id={`${securityRight.id}_${role.role.id}`}
											name={`${securityRight.id}_${role.role.id}`}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												if (e.target.checked) {
													arrayHelpers.push(role.role.id);
												} else {
													const idx = values[securityRight.id].indexOf(
														role.role.id
													);
													arrayHelpers.remove(idx);
												}
												submitForm();
											}}
										/>
									</td>
								);
							})
						}
					/>
					<td></td>
				</tr>
			);
		});
	};

	const renderModuleSecurityRights = (
		modules: RoleSecurityRight[],
		submitForm: any,
		values: any
	): ReactNode => {
		return modules.map((module: RoleSecurityRight) =>
			module.securityRights ? (
				<>
					<tr key={module.id}>
						<th>{module.name}</th>
					</tr>
					{renderSecurityRightsRows(module.securityRights, submitForm, values)}
				</>
			) : (
				''
			)
		);
	};

	const getModuleTitle = (modules: RoleSecurityRight[], moduleId: string): ReactNode => {
		const matrixTitle = modules.find(module => module.id === moduleId)?.name;
		if (matrixTitle !== undefined) {
			return <CardTitle>{matrixTitle}</CardTitle>;
		} else {
			return <CardTitle>Alle permissies</CardTitle>;
		}
	};

	return (
		<Formik initialValues={formState} onSubmit={onChange}>
			{({ values, submitForm }) => (
				<Card>
					<CardBody>
						{getModuleTitle(permissions, title)}
						<table className="m-table">
							<thead>
								<tr className="m-table--header">
									<th></th>
									{roles.map((role: RoleResponse) => (
										<th key={role.role.id} className="a-table-header--top">
											<div>
												<span>{role.role?.attributes.displayName}</span>
											</div>
										</th>
									))}
									<th></th>
								</tr>
							</thead>
							<tbody>
								{renderModuleSecurityRights(permissions, submitForm, values)}
							</tbody>
						</table>
					</CardBody>
				</Card>
			)}
		</Formik>
	);
};

export default RolesPermissionsList;