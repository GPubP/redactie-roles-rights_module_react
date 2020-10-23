import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { ErrorMessage, FormikOnChangeHandler } from '@redactie/utils';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { RoleDetailFormState } from '../../../roles.types';
import DefaultFormActions from '../../DefaultFormActions/DefaultFormActions';

import { ROLE_DETAIL_VALIDATION_SCHEMA } from './RoleDetailForm.const';
import { RoleDetailFormProps } from './RoleDetailForm.types';

const RoleDetailForm: FC<RoleDetailFormProps> = ({
	initialState,
	isLoading = false,
	isDeleting = false,
	hasChanges = false,
	onDelete,
	children,
	onCancel = () => null,
	onSubmit = () => null,
	onChange = () => null,
}) => {
	const [t] = useCoreTranslation();

	const renderDelete = (): ReactElement => {
		return (
			<Card className="u-margin-top">
				<CardBody>
					<CardTitle>Rol verwijderen</CardTitle>
					<Button
						onClick={onDelete}
						className="u-margin-top"
						type="danger"
						outline
						iconLeft={isDeleting ? 'circle-o-notch fa-spin' : null}
					>
						{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
					</Button>
				</CardBody>
			</Card>
		);
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={ROLE_DETAIL_VALIDATION_SCHEMA}
		>
			{props => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as RoleDetailFormState)}
						/>
						<div className="row">
							<div className="col-xs-12 col-md-6">
								<Field
									description="Geef de rol een korte en duidelijke naam."
									as={TextField}
									required
									id="name"
									label="Naam"
									name="name"
								/>
								<ErrorMessage name="name" />
							</div>
						</div>
						<div className="row u-margin-top">
							<div className="col-xs-12">
								<Field
									as={Textarea}
									id="description"
									required
									label="Beschrijving"
									name="description"
								/>
								<small>
									Geef de rol een duidelijke beschrijving voor in het overzicht
								</small>
								<ErrorMessage name="description" />
							</div>
						</div>
						{onDelete ? renderDelete() : null}
						<DefaultFormActions
							isLoading={isLoading}
							saveBtnDisabled={isDeleting}
							hasChanges={hasChanges}
							onCancel={onCancel}
						/>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default RoleDetailForm;
