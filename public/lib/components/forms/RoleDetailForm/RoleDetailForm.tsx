import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { DeletePrompt, ErrorMessage, FormikOnChangeHandler } from '@redactie/utils';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { RoleDetailFormState } from '../../../roles.types';
import DefaultFormActions from '../../DefaultFormActions/DefaultFormActions';

import { ROLE_DETAIL_VALIDATION_SCHEMA } from './RoleDetailForm.const';
import { RoleDetailFormProps } from './RoleDetailForm.types';

const RoleDetailForm: FC<RoleDetailFormProps> = ({
	initialState,
	readonly = false,
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
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const onDeletePromptConfirm = (): void => {
		if (onDelete) {
			onDelete();
		}
	};

	const onDeletePromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	const renderDelete = (): ReactElement => {
		return (
			<>
				<Card className="u-margin-top">
					<CardBody>
						<CardTitle>Verwijderen</CardTitle>
						<p>
							Opgelet, indien u deze rol verwijdert verliezen gebruikers die deze rol
							hebben alle bijhorende rechten.
						</p>
						<Button
							onClick={() => setShowDeleteModal(true)}
							className="u-margin-top"
							type="danger"
							iconLeft="trash-o"
						>
							{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
						</Button>
					</CardBody>
				</Card>
				<DeletePrompt
					body="Ben je zeker dat je deze rol wil verwijderen? Dit kan niet ongedaan gemaakt worden."
					isDeleting={isDeleting}
					show={showDeleteModal}
					onCancel={onDeletePromptCancel}
					onConfirm={onDeletePromptConfirm}
				/>
			</>
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
									disabled={readonly}
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
									disabled={readonly}
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
						{!readonly && (
							<DefaultFormActions
								isLoading={isLoading}
								saveBtnDisabled={isDeleting}
								hasChanges={hasChanges}
								onCancel={onCancel}
							/>
						)}
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default RoleDetailForm;
