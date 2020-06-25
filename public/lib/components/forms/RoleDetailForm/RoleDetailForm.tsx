import { Button, Textarea, TextField } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import { useCoreTranslation } from '../../../connectors/translations';

import { ROLE_DETAIL_VALIDATION_SCHEMA } from './RoleDetailForm.const';
import { RoleDetailFormProps } from './RoleDetailForm.types';

const RoleDetailForm: FC<RoleDetailFormProps> = ({ initialState, onCancel, onSubmit, loading }) => {
	const [t] = useCoreTranslation();

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
					<ActionBar className="o-action-bar--fixed" isOpen>
						<ActionBarContentSection>
							<div className="u-wrapper row end-xs">
								<Button onClick={onCancel} negative>
									{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
								</Button>
								<Button
									iconLeft={loading ? 'circle-o-notch fa-spin' : null}
									disabled={loading}
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
