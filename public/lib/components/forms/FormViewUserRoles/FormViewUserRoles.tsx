import { Checkbox } from '@acpaas-ui/react-components';
import { FormikOnChangeHandler } from '@redactie/utils';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC, useMemo } from 'react';

import { sortUserRoles } from '../../../helpers';
import { RoleModel } from '../../../store/roles';

import { FormViewUserRolesProps, UserRolesFormState } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({
	initialState,
	availableRoles,
	checkAdmin = false,
	children,
	formikRef = () => null,
	onChange = () => null,
	onSubmit = () => null,
}) => {
	const sortedRoles = useMemo(() => {
		return sortUserRoles(availableRoles);
	}, [availableRoles]);

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
								sortedRoles &&
								sortedRoles.map((role: RoleModel) => (
									<Field
										key={role.id}
										as={Checkbox}
										checked={values.roleIds && values.roleIds.includes(role.id)}
										disabled={checkAdmin && role.attributes.admin}
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
