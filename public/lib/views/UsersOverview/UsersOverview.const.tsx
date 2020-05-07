import { Button } from '@acpaas-ui/react-components';
import moment from 'moment';
import React from 'react';

import { UsersOverviewTableRow } from './UsersOverview.types';

export const USERS_OVERVIEW_COLUMNS = [
	{
		label: 'Naam',
		value: 'name',
	},
	{
		label: 'Status',
		value: 'status',
	},
	{
		label: 'Type',
		value: 'type',
	},
	{
		label: 'Toegevoegd',
		value: 'added',
		format: (data: string) => moment(data).format('DD/MM/YYYY'),
	},
	{
		label: 'Status',
		value: 'status',
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
