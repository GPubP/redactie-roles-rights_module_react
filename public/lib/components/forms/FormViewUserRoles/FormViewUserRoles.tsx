import { Checkbox } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import { FormViewUserRolesProps, Role } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({ formState, onSubmit }) => {
	const handleChange = (e: any): void => {
		const { name } = e.target;
		const updatedFormState = formState;
		const itemToUpdate = updatedFormState.findIndex((x: any) => x.name === name);

		updatedFormState[itemToUpdate].checked = !updatedFormState[itemToUpdate].checked;

		onSubmit(updatedFormState);
	};
	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{({ values, submitForm }) => (
				<>
					{values.map((role: Role) => (
						<Field
							key={role.name}
							as={Checkbox}
							checked={role.checked}
							id={role.name}
							name={role.name}
							label={role.name}
							onChange={handleChange}
						/>
					))}
				</>
			)}
		</Formik>
	);
};

export default FormViewUserRoles;
