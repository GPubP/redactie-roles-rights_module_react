import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import { TableColumn } from '@redactie/utils';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { checkSecurityRights } from '../../helpers';
import { SecurityRightsTenant } from '../../roles.const';

import { UsersOverviewTableRow } from './UsersOverview.types';

export const USERS_OVERVIEW_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<UsersOverviewTableRow>[] => {
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsTenant.UsersUpdateTenantRoles],
		false
	);
	const defaultColumns: TableColumn<UsersOverviewTableRow>[] = [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			disableSorting: true,
			value: 'name',
			width: '50%',
			component(value: string, rowData) {
				return (
					<>
						<AUILink to={`${rowData?.uuid}/algemeen`} component={Link}>
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
			component(value, { uuid, navigate }) {
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
