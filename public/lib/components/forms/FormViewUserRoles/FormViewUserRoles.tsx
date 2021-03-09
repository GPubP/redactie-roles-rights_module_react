import { Checkbox } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler } from '@redactie/utils';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC } from 'react';

import { RoleModel } from '../../../store/roles';

import { FormViewUserRolesProps, UserRolesFormState } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({
	initialState,
	availableRoles,
	checkAdmin = false,
	readonly = false,
	children,
	formikRef = () => null,
	onChange = () => null,
	onSubmit = () => null,
}) => {
	/**
	 * Render
	 */
	return (
		<Formik
			innerRef={formikRef}
			enableReinitialize
			initialValues={initialState}
			onSubmit={onSubmit}
		>
			{props => {
				const { values } = props;
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as UserRolesFormState)}
						/>
						<FieldArray
							name="roleIds"
							render={arrayHelpers =>
								availableRoles &&
								availableRoles.map((role: RoleModel) => (
									<Field
										key={role.id}
										as={Checkbox}
										checked={values.roleIds && values.roleIds.includes(role.id)}
										disabled={(checkAdmin && role.attributes.admin) || readonly}
										id={role.id}
										name={role.name}
										label={role.attributes.displayName}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											if (e.target.checked) arrayHelpers.unshift(role.id);
											else {
												const idx = values.roleIds.indexOf(role.id);
												arrayHelpers.remove(idx);
											}
										}}
									/>
								))
							}
						/>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default FormViewUserRoles;
