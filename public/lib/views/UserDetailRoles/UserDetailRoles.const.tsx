import { Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module/public/lib/i18next/useTranslation';
import { LoadingState, TableColumn } from '@redactie/utils';
import React from 'react';

import { SecurableRender } from '../../components';
import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { SecurityRightsTenant } from '../../roles.const';
import { RoleModel } from '../../store/roles';

import { SiteRow } from './UserDetailRoles.types';

export const SITE_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[],
	isAddingUserToSite: LoadingState | null,
	giveAccessSiteId: string | null
): TableColumn<SiteRow>[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		disableSorting: true,
		value: 'name',
		width: '30%',
		component(value: string) {
			return <>{value}</>;
		},
	},
	{
		label: 'Rollen',
		value: 'roles',
		disableSorting: true,
		ellipsis: true,
		width: '45%',
		component(value, { hasAccess, roles = [] }) {
			if (!hasAccess) {
				return <span className="u-text-light u-text-italic">Geen toegang</span>;
			}

			const rolesList = roles
				.map((role: RoleModel) => role.attributes.displayName)
				.join(', ');

			return (
				<span>
					{rolesList ? <EllipsisWithTooltip>{rolesList}</EllipsisWithTooltip> : '/'}
				</span>
			);
		},
	},
	{
		label: '',
		disableSorting: true,
		classList: ['u-text-right'],
		width: '25%',
		component(value: string, rowData) {
			const { editAccess, giveAccess, hasAccess } = rowData;
			const isGivingAccess =
				giveAccessSiteId === rowData.siteUuid &&
				isAddingUserToSite === LoadingState.Loading;

			if (hasAccess) {
				return (
					<SecurableRender
						userSecurityRights={mySecurityRights}
						requiredSecurityRights={[SecurityRightsTenant.UsersUpdateSiteRoles]}
					>
						<Button
							ariaLabel="Edit"
							icon="edit"
							onClick={() => editAccess()}
							type="primary"
							transparent
						/>
					</SecurableRender>
				);
			}

			return (
				<SecurableRender
					userSecurityRights={mySecurityRights}
					requiredSecurityRights={[SecurityRightsTenant.UsersGrantSiteAccess]}
				>
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
				</SecurableRender>
			);
		},
	},
];
