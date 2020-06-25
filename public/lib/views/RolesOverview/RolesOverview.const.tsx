import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { prop } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import { checkSecurityRights } from '../../helpers';
import { SecurityRightsSite } from '../../roles.const';

import { RolesOverviewTableRow } from './RolesOverview.types';

export const ROLES_OVERVIEW_COLUMNS = (mySecurityRights: string[]): any[] => {
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.RolesRightsUpdateRole],
		false
	);

	const defaultColumns = [
		{
			label: 'Rol',
			value: 'description',
			component(value: any, rowData: RolesOverviewTableRow) {
				return (
					<>
						<AUILink to={'#'} component={Link}>
							{prop('name')(rowData)}
						</AUILink>
						<p className="u-text-light u-margin-top-xs">
							{prop('description')(rowData)}
						</p>
					</>
				);
			},
		},
		{
			label: 'Admin',
			value: 'admin',
			disableSorting: true,
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
			component(value: unknown, rowData: RolesOverviewTableRow) {
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
