import { Card, CardBody, CardTitle, Checkbox } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler, LeavePrompt } from '@redactie/utils';
import { FastField, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC, Fragment, ReactNode } from 'react';

import './RolesPermissionsForm.scss';
import { SecurityRightsSite } from '../../../roles.const';
import { SecurityRightResponse } from '../../../services/securityRights';
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
			const fieldArrayName = `['${securityRight.id}']`;
			return (
				<tr key={securityRight.id}>
					<td className="a-table-header--side">{securityRight.attributes.displayName}</td>
					<FieldArray
						// Names are made out of dots, to avoid that formik creates a nested structure we have added this funky fieldname:
						// https://github.com/italodeandra/formik/blob/patch-1/docs/guides/arrays.md
						name={fieldArrayName}
						render={arrayHelpers =>
							roles?.map(role => {
								const fieldId = `${securityRight.id}_${role.id}`;
								return (
									<td className="a-table-checkbox" key={fieldId}>
										<FastField
											as={Checkbox}
											checked={
												values[securityRight.id] &&
												values[securityRight.id].includes(role.id)
											}
											disabled={readonly || role.attributes.admin}
											id={fieldId}
											name={fieldArrayName}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												if (e.target.checked) {
													arrayHelpers.push(role.id);
												} else {
													const idx = values[securityRight.id].indexOf(
														role.id
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
					<td />
				</tr>
			);
		});
	};

	const renderModuleSecurityRights = (modules: RoleSecurityRight[], values: any): ReactNode => {
		return modules.map((module: RoleSecurityRight) =>
			module.securityRights ? (
				<Fragment key={module.id}>
					<tr className="a-table-category">
						<th colSpan={roles.length + 2}>
							{module.name} <span className="u-text-light">({module.type})</span>
						</th>
					</tr>
					{renderSecurityRightsRows(module.securityRights, values)}
				</Fragment>
			) : null
		);
	};

	return (
		<Formik initialValues={initialFormState} onSubmit={onSubmit}>
			{({ values, submitForm }) => (
				<>
					<FormikOnChangeHandler delay={0} onChange={onChange} />
					<Card>
						<CardBody>
							{getModuleTitle(permissions, title)}
							<table className="m-table">
								<thead>
									<tr className="m-table--header">
										<th />
										{roles.map(role => (
											<th key={role.id} className="a-table-header--top">
												<div>
													<span>{role?.attributes.displayName}</span>
												</div>
											</th>
										))}
										<th />
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
