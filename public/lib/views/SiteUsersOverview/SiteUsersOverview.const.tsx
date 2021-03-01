import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { checkSecurityRights } from '../../helpers';
import { ALERT_CONTAINER_IDS, SecurityRightsSite } from '../../roles.const';
import { Tab } from '../../roles.types';

import { UsersOverviewTableRow } from './SiteUsersOverview.types';

export const SITE_USER_OVERVIEW_TABS: Tab[] = [
	{
		name: 'Site',
		target: 'site',
		active: true,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
	{
		name: 'Tenant',
		target: 'tenant',
		active: false,
		disabled: false,
		containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
];

export const USERS_OVERVIEW_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<UsersOverviewTableRow>[] => {
	const canUpdate = checkSecurityRights(mySecurityRights, [
		SecurityRightsSite.UsersUpdateSiteRoles,
	]);
	const defaultColumns: TableColumn<UsersOverviewTableRow>[] = [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			disableSorting: true,
			value: 'name',
			width: '50%',
			component(value: string, rowData) {
				return (
					<>
						<AUILink to={`../${rowData?.uuid}/rollen`} component={Link}>
							<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
						</AUILink>
					</>
				);
			},
		},
		{
			label: t(CORE_TRANSLATIONS.TABLE_TYPE),
			disableSorting: true,
			width: '30%',
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
			width: '20%',
			component(value: unknown, rowData) {
				const { uuid, navigate } = rowData;

				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(uuid)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
