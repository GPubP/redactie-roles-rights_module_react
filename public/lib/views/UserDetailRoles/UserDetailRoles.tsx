import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Table } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import { ContentType } from '../../roles.types';

import { DUMMY_SITES, SITE_COLUMNS, SITE_VALIDATION_SCHEMA } from './UserDetailRoles.const';
import { UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({
	user,
	userRoles,
	roles,
	onCancel,
	onSubmit,
}) => {
	const [t] = useCoreTranslation();
	const [selectedRoles, updateSelectedRoles] = useState(mapUserRoles(userRoles));

	/**
	 * Functions
	 */
	const onConfigSave = (): void => {
		if (mapUserRoles(userRoles) !== selectedRoles) {
			onSubmit(user, selectedRoles, ContentType.UserRoles);
		}
	};

	const onConfigChange = (updatedRoles: any): void => {
		updateSelectedRoles(updatedRoles);
	};
	/**
	 * Render
	 */
	const renderTableField = ({ value: fields }: { value: any[] }): ReactElement => {
		const siteRows: any[] = (fields || []).map(site => ({
			name: site.name,
			roles: site.roles,
			path: '#',
			setActiveField: () => console.log(site),
			editAccess: () => console.log(site),
		}));

		return (
			<Table
				className="u-margin-top"
				columns={SITE_COLUMNS()}
				rows={siteRows}
				totalValues={DUMMY_SITES.length}
			/>
		);
	};

	const renderTableForm = (): ReactElement => {
		return (
			<Formik
				initialValues={{ fields: DUMMY_SITES }}
				onSubmit={onConfigChange}
				validationSchema={SITE_VALIDATION_SCHEMA}
			>
				{() => <Field name="fields" placeholder="No fields" as={renderTableField} />}
			</Formik>
		);
	};

	return (
		<Card>
			<div className="u-margin">
				<h5 className="u-margin-bottom">Rollen</h5>
				<FormViewUserRoles
					formState={selectedRoles}
					availableRoles={roles}
					onSubmit={onConfigChange}
				/>
				{renderTableForm()}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<div className="u-wrapper">
							<Button
								className="u-margin-right-xs"
								onClick={onConfigSave}
								type="success"
							>
								{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
							</Button>
							<Button onClick={onCancel} outline>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
						</div>
					</ActionBarContentSection>
				</ActionBar>
			</div>
		</Card>
	);
};

export default UserDetailRoles;
