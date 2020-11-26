import { Card } from '@acpaas-ui/react-components';
import { PaginatedTable } from '@acpaas-ui/react-editorial-components';
import { DataLoader, LoadingState, useAPIQueryParams, useNavigate } from '@redactie/utils';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import { useUsersLoadingStates, useSitesPagination, useSitesLoadingStates } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { SearchParams } from '../../services/api';
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
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = useCoreTranslation();
	const { isAddingUserToSite } = useUsersLoadingStates();
	const [giveAccesSiteId, setGiveAccessSiteId] = useState<string | null>(null);
	const { navigate } = useNavigate();
	const [query, setQuery] = useAPIQueryParams();
	const sitesPagination = useSitesPagination(query as SearchParams, user.id);
	const sitesLoadingStates = useSitesLoadingStates();

	/**
	 * Hooks
	 */
	useEffect(() => {
		if (initialLoading === LoadingState.Loaded) {
			return;
		}

		if ((sitesLoadingStates.isFetching === LoadingState.Loaded ||
			sitesLoadingStates.isFetching === LoadingState.Error)) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [sitesLoadingStates.isFetching]);

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
		if (!sitesPagination) {
			return null;
		}

		const siteRows: SiteRow[] = sitesPagination.data.map(site => ({
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
				className="u-margin-top"
				columns={SITE_COLUMNS(t, mySecurityRights, isAddingUserToSite, giveAccesSiteId)}
				rows={siteRows}
				currentPage={sitesPagination?.currentPage}
				itemsPerPage={query.pagesize}
				onPageChange={handlePageChange}
				noDataMessage="Er zijn geen resultaten voor de ingestelde filters"
				loadDataMessage="Sites ophalen"
				totalValues={sitesPagination?.total}
				loading={sitesLoadingStates.isFetching === LoadingState.Loading}
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
				<DataLoader loadingState={initialLoading} render={SitesTable} />
			</div>
		</Card>
	);
};

export default UserDetailRoles;
