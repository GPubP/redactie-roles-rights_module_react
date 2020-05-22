import { Button } from '@acpaas-ui/react-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import React from 'react';

import { UsersOverviewTableRow } from './SiteUsersOverview.types';

export const CONTENT_INITIAL_FILTER_STATE = {
	name: '',
};

export const USERS_OVERVIEW_COLUMNS = (t: TranslateFunc): any[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		disableSorting: true,
		value: 'name',
	},
	{
		label: t(CORE_TRANSLATIONS.TABLE_TYPE),
		disableSorting: true,
		value: 'type',
	},
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
