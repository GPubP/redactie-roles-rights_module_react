import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { checkSecurityRights } from '../../helpers';
import { SecurityRightsSite } from '../../roles.const';

import { UsersOverviewTableRow } from './SiteUsersOverview.types';

export const CONTENT_INITIAL_FILTER_STATE = {
	name: '',
};

export const USERS_OVERVIEW_COLUMNS = (t: TranslateFunc, mySecurityRights: string[]): any[] => {
	const canUpdate = checkSecurityRights(mySecurityRights, [
		SecurityRightsSite.UsersUpdateSiteRoles,
	]);
	const defaultColumns = [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			disableSorting: true,
			value: 'name',
			component(value: any, rowData: UsersOverviewTableRow) {
				return (
					<>
						<AUILink to={`${rowData?.uuid}/rollen`} component={Link}>
							{value}
						</AUILink>
					</>
				);
			},
		},
		{
			label: t(CORE_TRANSLATIONS.TABLE_TYPE),
			disableSorting: true,
			value: 'type',
		},
	];

	if (!canUpdate) {
		return defaultColumns;
	}

	return [
		...defaultColumns,
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			component(value: unknown, rowData: UsersOverviewTableRow) {
				const { uuid, navigate } = rowData;

				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(uuid)}
						type="primary"
						transparent
					></Button>
				);
			},
		},
	];
};
