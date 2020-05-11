import { Button } from '@acpaas-ui/react-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { array, object, string } from 'yup';

export const DUMMY_SITES = [
	{
		name: 'Antwerpen.be',
		roles: ['Sitebeheerder', 'Hoofdredacteur', 'Eindredacteur', 'Redacteur'],
	},
	{
		name: 'Nogeensite.be',
		roles: ['Eindredacteur', 'Redacteur'],
	},
	{
		name: 'Nogeensite.be',
		roles: ['Redacteur'],
	},
	{
		name: 'Nogeensite.be',
		roles: [],
	},
];

export const DUMMY_ROLES = [
	{
		name: 'Tenantbeheerder',
		checked: true,
	},
	{
		name: 'Contentbeheerder',
		checked: true,
	},
];

export const SITE_COLUMNS = (): any[] => [
	{
		label: 'Naam',
		value: 'name',
		component(value: string, rowData: any) {
			const { path, setActiveField, editAccess } = rowData;
			return (
				<>
					<Link to={path} onClick={() => setActiveField()}>
						{value}
					</Link>
				</>
			);
		},
	},
	{
		label: 'Rollen',
		value: 'roles',
		disableSorting: true,
		component(value: any, rowData: any) {
			if (rowData.roles.length === 0) {
				return <span className="u-text-light">Geen toegang</span>;
			}
			return <span>{rowData.roles.join(',')}</span>;
		},
	},
	{
		label: '',
		disableSorting: true,
		component(value: string, rowData: any) {
			const { editAccess } = rowData;
			const hasAccess = rowData.roles.length > 0 ? true : false;

			if (hasAccess) {
				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => editAccess()}
						type="primary"
						transparent
					/>
				);
			}

			return (
				<Button onClick={() => editAccess()} type="primary" outline>
					Toegang geven
				</Button>
			);
		},
	},
];

export const SITE_VALIDATION_SCHEMA = object().shape({
	fields: array(
		object().shape({
			name: string(),
			roles: array(string()),
		})
	),
});
