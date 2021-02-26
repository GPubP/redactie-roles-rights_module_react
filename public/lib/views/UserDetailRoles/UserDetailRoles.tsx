import { Card } from '@acpaas-ui/react-components';
import { PaginatedTable } from '@acpaas-ui/react-editorial-components';
import { LoadingState, SearchParams, useAPIQueryParams, useNavigate } from '@redactie/utils';
import React, { FC, useMemo, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { sitesConnector, useCoreTranslation } from '../../connectors';
import { mapUserRoles } from '../../helpers';
import { useSitesPagination, useUsersLoadingStates } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { usersFacade } from '../../store/users';

import { SITE_COLUMNS } from './UserDetailRoles.const';
import { SiteRow, UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({
	user,
	userRoles,
	roles,
	mySecurityRights,
	formikRef = () => null,
	onChange,
}) => {
	/**
	 * Hooks
	 */

	const [t] = useCoreTranslation();
	const { isAddingUserToSite } = useUsersLoadingStates();
	const [giveAccesSiteId, setGiveAccessSiteId] = useState<string | null>(null);
	const { navigate } = useNavigate();
	const [query, setQuery] = useAPIQueryParams({});
	const [sitesPagination, isFetchingUserRolesForSite] = useSitesPagination(
		query as SearchParams,
		user.id,
		true
	);
	const sitesLoadingStates = sitesConnector.hooks.useSitesLoadingStates();

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

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			page: pageNumber,
		});
	};

	const SitesTable = (): React.ReactElement | null => {
		const siteRows: SiteRow[] | undefined = sitesPagination?.data.map(site => ({
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
			<PaginatedTable
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--sm"
				columns={SITE_COLUMNS(t, mySecurityRights, isAddingUserToSite, giveAccesSiteId)}
				rows={siteRows}
				currentPage={sitesPagination?.currentPage}
				itemsPerPage={query.pagesize}
				onPageChange={handlePageChange}
				noDataMessage="Er zijn geen resultaten"
				loadDataMessage="Sites ophalen"
				totalValues={sitesPagination?.total ?? 0}
				loading={
					sitesLoadingStates.isFetching === LoadingState.Loading ||
					isFetchingUserRolesForSite
				}
			></PaginatedTable>
		);
	};

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
					initialState={initialFormState}
					availableRoles={roles}
					onChange={onChange}
					formikRef={formikRef}
				/>
				<h5 className="u-margin-bottom u-margin-top">Rol(len) per site</h5>
				{SitesTable()}
			</div>
		</Card>
	);
};

export default UserDetailRoles;
