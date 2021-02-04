import { Link as AUILink, Icon } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { prop, propOr } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import { checkSecurityRights } from '../../helpers';
import { SecurityRightsSite } from '../../roles.const';

import { RolesOverviewTableRow } from './RolesOverview.types';

export const ROLES_OVERVIEW_COLUMNS = (mySecurityRights: string[]): any[] => {
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.RolesUpdate],
		false
	);

	const defaultColumns = [
		{
			label: 'Rol',
			value: 'description',
			disableSorting: true,
			width: '50%',
			component(value: any, rowData: RolesOverviewTableRow) {
				return (
					<>
						<AUILink to={propOr('#', 'target')(rowData)} component={Link}>
							<EllipsisWithTooltip>{prop('name')(rowData)}</EllipsisWithTooltip>
						</AUILink>
						<p className="u-text-light u-margin-top-xs">
							<EllipsisWithTooltip>
								{prop('description')(rowData)}
							</EllipsisWithTooltip>
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
			component(value: unknown, rowData: RolesOverviewTableRow) {
				return prop('admin')(rowData) ? (
					<span className="u-text-success fa fa-check"></span>
				) : (
					<span className="u-text-danger fa fa-close"></span>
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
						<Icon name="edit"></Icon>
					</AUILink>
				);
			},
		},
	];
};
