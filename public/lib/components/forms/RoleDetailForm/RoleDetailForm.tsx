import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { useCoreTranslation } from '../../../connectors/translations';

import { ROLE_DETAIL_VALIDATION_SCHEMA } from './RoleDetailForm.const';
import { RoleDetailFormProps } from './RoleDetailForm.types';

const RoleDetailForm: FC<RoleDetailFormProps> = ({
	initialState,
	onCancel,
	onSubmit,
	isLoading,
	isDeleting,
	onDelete,
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
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={ROLE_DETAIL_VALIDATION_SCHEMA}
		>
			{({ submitForm }) => (
				<>
					<div className="row">
						<div className="col-xs-12 col-md-6">
							<Field as={TextField} id="name" label="Naam" name="name" />
							<div className="u-text-light u-margin-top-xs">
								Geef de rol een korte en duidelijke naam.
							</div>
						</div>
					</div>
					<div className="row u-margin-top">
						<div className="col-xs-12">
							<Field
								as={Textarea}
								id="description"
								label="Beschrijving"
								name="description"
							/>
							<div className="u-text-light u-margin-top-xs">
								Geef de rol een duidelijke beschrijving voor in het overzicht
							</div>
						</div>
					</div>
					{onDelete ? renderDelete() : null}
					<ActionBar className="o-action-bar--fixed" isOpen>
						<ActionBarContentSection>
							<div className="u-wrapper row end-xs">
								<Button onClick={onCancel} negative>
									{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
								</Button>
								<Button
									iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
									disabled={isLoading || isDeleting}
									className="u-margin-left-xs"
									onClick={submitForm}
									type="success"
								>
									{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
								</Button>
							</div>
						</ActionBarContentSection>
					</ActionBar>
				</>
			)}
		</Formik>
	);
};

export default RoleDetailForm;
