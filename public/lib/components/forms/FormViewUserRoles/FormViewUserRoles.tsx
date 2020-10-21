import { Button, Checkbox } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { FormikOnChangeHandler, LeavePrompt } from '@redactie/utils';
import { Field, FieldArray, Formik } from 'formik';
import React, { ChangeEvent, FC } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { RoleModel } from '../../../store/roles';

import { FormViewUserRolesProps, UserRolesFormState } from './FormViewUserRoles.types';

const FormViewUserRoles: FC<FormViewUserRolesProps> = ({
	initialState,
	availableRoles,
	showActionBar = true,
	checkAdmin = false,
	isLoading = false,
	isChanged = false,
	formikRef = () => null,
	onCancel = () => null,
	onChange = () => null,
	onSubmit = () => null,
}) => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();

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
			{({ values, submitForm, resetForm }) => {
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
						{showActionBar && (
							<>
								<ActionBar className="o-action-bar--fixed" isOpen>
									<ActionBarContentSection>
										<div className="u-wrapper row end-xs">
											<Button onClick={() => onCancel(resetForm)} negative>
												{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
											</Button>
											<Button
												iconLeft={
													isLoading ? 'circle-o-notch fa-spin' : null
												}
												disabled={isLoading || !isChanged}
												className="u-margin-left-xs"
												onClick={submitForm}
												type="success"
											>
												{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
											</Button>
										</div>
									</ActionBarContentSection>
								</ActionBar>
								<LeavePrompt when={isChanged} onConfirm={submitForm} />
							</>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default FormViewUserRoles;
