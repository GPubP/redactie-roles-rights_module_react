import { Link as AUILink } from '@acpaas-ui/react-components';
import { prop } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import { RolesOverviewTableRow } from './RolesOverview.types';

export const CONTENT_INITIAL_FILTER_STATE = {
	name: '',
};

export const ROLES_OVERVIEW_COLUMNS = (): any[] => {
	const defaultColumns = [
		{
			label: 'Rol',
			disableSorting: true,
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

	return [...defaultColumns];
};
