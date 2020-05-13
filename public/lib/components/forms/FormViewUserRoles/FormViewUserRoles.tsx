import { Checkbox } from '@acpaas-ui/react-components';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC } from 'react';

import { RoleModel } from '../../../store/roles';

import { FormViewUserRolesProps } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({ formState, availableRoles, onSubmit }) => {
	return (
		<Formik initialValues={{ roleIds: formState }} onSubmit={onSubmit}>
			{({ values, submitForm }) => (
				<FieldArray
					name="roleIds"
					render={arrayHelpers =>
						availableRoles.map((role: RoleModel) => (
							<Field
								key={role.id}
								as={Checkbox}
								checked={values.roleIds.includes(role.id)}
								id={role.id}
								name={role.name}
								label={role.attributes.displayName}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									if (e.target.checked) arrayHelpers.push(role.id);
									else {
										const idx = values.roleIds.indexOf(role.id);
										arrayHelpers.remove(idx);
									}
									submitForm();
								}}
							/>
						))
					}
				/>
			)}
		</Formik>
	);
};

export default FormViewUserRoles;
