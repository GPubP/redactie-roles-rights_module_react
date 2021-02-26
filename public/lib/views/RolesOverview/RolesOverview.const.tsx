import { Link as AUILink, Icon } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { propOr } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import { CORE_TRANSLATIONS } from '../../connectors';
import { checkSecurityRights } from '../../helpers';
import { SecurityRightsSite } from '../../roles.const';

import { RolesOverviewTableRow } from './RolesOverview.types';

export const ROLES_OVERVIEW_COLUMNS = (mySecurityRights: string[], t: TranslateFunc): any[] => {
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.RolesUpdate],
		false
	);

	const defaultColumns = [
		{
			label: 'Rol',
			value: 'name',
			disableSorting: true,
			width: '50%',
			component(label: string, rowData: RolesOverviewTableRow) {
				const { description } = rowData;
				return (
					<>
						<AUILink to={propOr('#', 'target')(rowData)} component={Link}>
							<EllipsisWithTooltip>{label}</EllipsisWithTooltip>
						</AUILink>
						<p className="small">
							{description ? (
								<EllipsisWithTooltip>{description}</EllipsisWithTooltip>
							) : (
								<span className="u-text-italic">
									{t(CORE_TRANSLATIONS['TABLE_NO-DESCRIPTION'])}
								</span>
							)}
						</p>
					</>
				);
			},
		},
		{
			label: 'Admin',
			value: 'admin',
			disableSorting: true,
			width: '30%',
			component(isAdmin: boolean) {
				return isAdmin ? (
					<span className="u-text-success fa fa-check" />
				) : (
					<span className="u-text-danger fa fa-close" />
				);
			},
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
			component(value: unknown, rowData: RolesOverviewTableRow) {
				return (
					<AUILink
						to={propOr('#', 'target')(rowData)}
						component={Link}
						aria-label="Edit"
						className="a-button a-button--transparent has-icon"
					>
						<Icon name="edit" />
					</AUILink>
				);
			},
		},
	];
};
