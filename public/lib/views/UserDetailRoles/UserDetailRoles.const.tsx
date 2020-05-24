import { Button } from '@acpaas-ui/react-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import React from 'react';

import { LoadingState } from '../../roles.types';
import { RoleModel } from '../../store/roles';

export const SITE_COLUMNS = (
	t: TranslateFunc,
	isAddingUserToSite: LoadingState | null,
	giveAccessSiteId: string | null
): any[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		disableSorting: true,
		value: 'name',
		component(value: string) {
			return <>{value}</>;
		},
	},
	{
		label: 'Rollen',
		value: 'roles',
		disableSorting: true,
		component(value: any, rowData: any) {
			const { hasAccess, roles = [] } = rowData;
			if (!hasAccess) {
				return <span className="u-text-light">Geen toegang</span>;
			}
			return (
				<span>
					{roles.map((role: RoleModel) => role.attributes.displayName).join(',') || '/'}
				</span>
			);
		},
	},
	{
		label: '',
		disableSorting: true,
		component(value: string, rowData: any) {
			const { editAccess, giveAccess, hasAccess } = rowData;
			const isGivingAccess =
				giveAccessSiteId === rowData.siteUuid &&
				isAddingUserToSite === LoadingState.Loading;

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
				<Button
					iconLeft={isGivingAccess ? 'circle-o-notch fa-spin' : null}
					disabled={isGivingAccess}
					size="small"
					onClick={() => giveAccess()}
					type="primary"
					outline
				>
					Toegang geven
				</Button>
			);
		},
	},
];
