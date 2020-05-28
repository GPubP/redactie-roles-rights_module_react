import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Table } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import { useNavigate, useUsersLoadingStates } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { ContentType, LoadingState } from '../../roles.types';
import { usersFacade } from '../../store/users';

import { SITE_COLUMNS } from './UserDetailRoles.const';
import { SiteRow, UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({
	user,
	userRoles,
	roles,
	sites,
	onCancel,
	onSubmit,
}) => {
	const [t] = useCoreTranslation();
	const [selectedRoles, updateSelectedRoles] = useState(mapUserRoles(userRoles));
	const { isAddingUserToSite, isUpdating } = useUsersLoadingStates();
	const [giveAccesSiteId, setGiveAccessSiteId] = useState<string | null>(null);
	const { navigate } = useNavigate();

	/**
	 * Functions
	 */
	const onConfigSave = (): void => {
		if (mapUserRoles(userRoles) !== selectedRoles) {
			onSubmit(user, selectedRoles, ContentType.UserRoles);
		}
	};

	const onConfigChange = (updatedRoles: any): void => {
		updateSelectedRoles(updatedRoles);
	};

	const redirectToSitesRolesDetail = (userId: string, siteId: string): void => {
		navigate(MODULE_PATHS.tenantUserDetailRolesUpdate, {
			siteUuid: siteId,
			userUuid: userId,
		});
	};
	/**
	 * Render
	 */
	const renderTable = (): ReactElement => {
		const siteRows: SiteRow[] = sites.map(site => ({
			name: site.data.name,
			roles: site.roles,
			siteUuid: site.uuid,
			editAccess: () => redirectToSitesRolesDetail(user.id, site.uuid),
			giveAccess: () => {
				setGiveAccessSiteId(site.uuid);
				usersFacade.addUserToSite(
					{
						siteUuid: site.uuid,
						userUuid: user.id,
					},
					() => redirectToSitesRolesDetail(user.id, site.uuid)
				);
			},
			hasAccess: site?.hasAccess,
		}));

		return (
			<Table
				className="u-margin-top"
				columns={SITE_COLUMNS(t, isAddingUserToSite, giveAccesSiteId)}
				rows={siteRows}
				totalValues={sites.length}
			/>
		);
	};

	return (
		<Card>
			<div className="u-margin">
				<h5 className="u-margin-bottom">Rollen</h5>
				<FormViewUserRoles
					formState={selectedRoles}
					availableRoles={roles}
					onSubmit={onConfigChange}
				/>
				<h5 className="u-margin-bottom u-margin-top">Rol(len) per site</h5>
				{renderTable()}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<div className="u-wrapper row end-xs">
							<Button onClick={onCancel} negative>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
							<Button
								iconLeft={
									isUpdating === LoadingState.Loading
										? 'circle-o-notch fa-spin'
										: null
								}
								disabled={isUpdating === LoadingState.Loading}
								className="u-margin-left-xs"
								onClick={onConfigSave}
								type="success"
							>
								{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
							</Button>
						</div>
					</ActionBarContentSection>
				</ActionBar>
			</div>
		</Card>
	);
};

export default UserDetailRoles;
