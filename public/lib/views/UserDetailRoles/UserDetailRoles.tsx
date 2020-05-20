import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Table } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import { useNavigate } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { ContentType } from '../../roles.types';
import { usersFacade } from '../../store/users';

import { SITE_COLUMNS, SITE_VALIDATION_SCHEMA } from './UserDetailRoles.const';
import { SiteRow, UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({
	user,
	userRoles,
	roles,
	sites,
	onCancel,
	onSubmit,
}) => {
	const [t] = useCoreTranslation();
	const [selectedRoles, updateSelectedRoles] = useState(mapUserRoles(userRoles));
	const { navigate } = useNavigate();

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

	const redirectToSitesRolesDetail = (userId: string, siteId: string): void => {
		navigate(MODULE_PATHS.tenantUserDetailRolesUpdate, {
			siteUuid: siteId,
			userUuid: userId,
		});
	};
	/**
	 * Render
	 */
	const renderTableField = ({ value: fields }: { value: SiteRow[] }): ReactElement => {
		const siteRows: any[] = (fields || []).map(site => ({
			name: site.name,
			roles: site.roles,
			siteUuid: site.id,
			path: '#',
			setActiveField: () => console.log(site),
			editAccess: () => redirectToSitesRolesDetail(user.id, site.id),
			giveAccess: () =>
				usersFacade.addUserToSite(
					{
						siteId: site.id,
						userId: user.id,
					},
					() => redirectToSitesRolesDetail(user.id, site.id)
				),
			hasAccess: site?.hasAccess,
		}));

		return (
			<Table
				className="u-margin-top"
				columns={SITE_COLUMNS(t)}
				rows={siteRows}
				totalValues={sites.length}
			/>
		);
	};

	const renderTableForm = (): ReactElement => {
		const sitesRows: SiteRow[] = sites.map(site => ({
			id: site.uuid,
			name: site.data.name,
			roles: site.roles,
			hasAccess: site.hasAccess,
		}));

		return (
			<Formik
				initialValues={{ fields: sitesRows }}
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
						<div className="u-wrapper row end-xs">
							<Button onClick={onCancel} negative>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
							<Button
								className="u-margin-left-xs"
								onClick={onConfigSave}
								type="success"
							>
								{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
							</Button>
						</div>
					</ActionBarContentSection>
				</ActionBar>
			</div>
		</Card>
	);
};

export default UserDetailRoles;
