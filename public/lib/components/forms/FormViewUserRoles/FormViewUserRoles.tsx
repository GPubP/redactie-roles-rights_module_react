import { Checkbox } from '@acpaas-ui/react-components';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC, useMemo } from 'react';

import { RoleModel } from '../../../store/roles';

import { FormViewUserRolesProps, RoleIds } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({ formState, availableRoles, onSubmit }) => {
	const handleFormSubmit = (object: RoleIds): void => {
		onSubmit(object.roleIds);
	};

	const initialValues = useMemo(() => {
		return {
			roleIds: formState,
		};
	}, [formState]);
	return (
		<Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
			{({ values, submitForm }) => (
				<FieldArray
					name="roleIds"
					render={arrayHelpers =>
						availableRoles &&
						availableRoles.map((role: RoleModel) => (
							<Field
								key={role.id}
								as={Checkbox}
								checked={values.roleIds && values.roleIds.includes(role.id)}
								disabled={role.attributes.admin}
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
