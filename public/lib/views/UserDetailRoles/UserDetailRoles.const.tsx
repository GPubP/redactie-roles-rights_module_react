import { Button } from '@acpaas-ui/react-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import React from 'react';
import { Link } from 'react-router-dom';
import { array, object, string } from 'yup';

import { RoleModel } from '../../store/roles';

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

export const SITE_COLUMNS = (t: TranslateFunc): any[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		value: 'name',
		component(value: string, rowData: any) {
			const { path, setActiveField } = rowData;
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
			return (
				<span>
					{rowData.roles.map((role: RoleModel) => role.attributes.displayName).join(',')}
				</span>
			);
		},
	},
	{
		label: '',
		disableSorting: true,
		component(value: string, rowData: any) {
			const { editAccess, giveAccess } = rowData;
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
				<Button onClick={() => giveAccess()} type="primary" outline>
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
