import { Card } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import React, { FC, useMemo, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import { useNavigate, useUsersLoadingStates } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { usersFacade } from '../../store/users';

import { SITE_COLUMNS } from './UserDetailRoles.const';
import { SiteRow, UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({
	user,
	userRoles,
	roles,
	sites,
	mySecurityRights,
}) => {
	const [t] = useCoreTranslation();
	const { isAddingUserToSite } = useUsersLoadingStates();
	const [giveAccesSiteId, setGiveAccessSiteId] = useState<string | null>(null);
	const { navigate } = useNavigate();

	/**
	 * Methods
	 */
	const initialFormState = useMemo(
		() => ({
			roleIds: mapUserRoles(userRoles),
		}),
		[userRoles]
	);

	const redirectToSitesRolesDetail = (userId: string, siteId: string): void => {
		navigate(MODULE_PATHS.tenantUserDetailRolesUpdate, {
			siteUuid: siteId,
			userUuid: userId,
		});
	};

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

	/**
	 * Render
	 */

	if (!initialFormState) {
		return null;
	}
	return (
		<Card>
			<div className="u-margin">
				<h5 className="u-margin-bottom">Rollen</h5>
				<FormViewUserRoles
					checkAdmin
					showActionBar={false}
					initialState={initialFormState}
					availableRoles={roles}
				/>
				<h5 className="u-margin-bottom u-margin-top">Rol(len) per site</h5>
				<Table
					className="u-margin-top"
					columns={SITE_COLUMNS(t, mySecurityRights, isAddingUserToSite, giveAccesSiteId)}
					rows={siteRows}
					totalValues={sites.length}
				/>
			</div>
		</Card>
	);
};

export default UserDetailRoles;
