import { Checkbox } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import AutoSubmit from '../AutoSubmit/AutoSubmit';

import { FormViewUserRolesProps, Role } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({ formState, onSubmit }) => {
	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{({ values, submitForm }) => (
				<>
					<AutoSubmit initialValues={formState} values={values} submitForm={submitForm} />
					{values.map((role: Role) => (
						<Field
							key={role.name}
							as={Checkbox}
							checked={role.checked}
							id={role.name}
							name={role.name}
							label={role.name}
						/>
					))}
				</>
			)}
		</Formik>
	);
};

export default FormViewUserRoles;
