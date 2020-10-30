/* eslint-disable prettier/prettier */
import { Card, CardBody, CardTitle, Checkbox } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler, LeavePrompt } from '@redactie/utils';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC, ReactNode } from 'react';

import './RolesPermissionsForm.scss';
import { SecurityRightsSite } from '../../../roles.const';
import { RoleResponse, SecurityRightResponse } from '../../../services/securityRights';
import { RoleSecurityRight } from '../../../views/RolesRightsOverview/RolesRightsOverview.types';
import DefaultFormActions from '../../DefaultFormActions/DefaultFormActions';
import SecurableRender from '../../SecurableRender/SecurableRender';

import { RolesPermissionsFormProps } from './RolesPermissionsForm.types';

const RolesPermissionsForm: FC<RolesPermissionsFormProps> = ({
	title,
	roles,
	permissions,
	initialFormState,
	mySecurityRights,
	readonly = false,
	isLoading = false,
	hasChanges = false,
	onChange = () => null,
	onCancel = () => null,
	onSubmit = () => null,
}) => {
	/**
	 * Function
	 */
	const getModuleTitle = (modules: RoleSecurityRight[], moduleId: string): ReactNode => {
		const matrixTitle = modules.find(module => module.id === moduleId)?.name;
		if (matrixTitle !== undefined) {
			return <CardTitle>{matrixTitle}</CardTitle>;
		} else {
			return <CardTitle>Alle permissies</CardTitle>;
		}
	};

	/**
	 * Render
	 */
	if (!initialFormState) {
		return null;
	}

	const renderSecurityRightsRows = (
		securityRights: SecurityRightResponse[],
		values: any
	): ReactNode => {
		return securityRights.map((securityRight: SecurityRightResponse) => {
			return (
				<tr key={securityRight.id}>
					<td className="a-table-header--side">{securityRight.attributes.displayName}</td>
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
											disabled={readonly || role.role.attributes.admin}
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

	const renderModuleSecurityRights = (modules: RoleSecurityRight[], values: any): ReactNode => {
		return modules.map((module: RoleSecurityRight) =>
			module.securityRights ? (
				<>
					<tr key={module.id} className="a-table-category">
						<th colSpan={roles.length + 2}>
							{module.name} <span className="u-text-light">({module.type})</span>
						</th>
					</tr>
					{renderSecurityRightsRows(module.securityRights, values)}
				</>
			) : (
				''
			)
		);
	};

	return (
		<Formik enableReinitialize initialValues={initialFormState} onSubmit={onSubmit}>
			{({ values, submitForm }) => (
				<>
					<FormikOnChangeHandler delay={0} onChange={values => onChange(values)} />
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
								<tbody>{renderModuleSecurityRights(permissions, values)}</tbody>
							</table>
						</CardBody>
					</Card>
					<SecurableRender
						userSecurityRights={mySecurityRights}
						requiredSecurityRights={[
							SecurityRightsSite.RolesRightsUpdateRolePermissions,
						]}
					>
						<DefaultFormActions
							hasChanges={hasChanges}
							isLoading={isLoading}
							onCancel={onCancel}
						/>
						<LeavePrompt
							shouldBlockNavigationOnConfirm
							when={hasChanges}
							onConfirm={submitForm}
						/>
					</SecurableRender>
				</>
			)}
		</Formik>
	);
};

export default RolesPermissionsForm;