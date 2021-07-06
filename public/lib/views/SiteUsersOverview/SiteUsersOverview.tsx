import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	ContextHeaderTabLinkProps,
	DataLoader,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { FilterForm, FilterFormState } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useUsers } from '../../hooks';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import {
	ALERT_CONTAINER_IDS,
	DEFAULT_USERS_QUERY_PARAMS,
	MODULE_PATHS,
	SITE_CONTEXT_DEFAULT_BREADCRUMBS,
	SITES_ROOT,
	USERS_QUERY_PARAMS_CONFIG,
} from '../../roles.const';
import { OverviewFilterItem, RolesRouteProps } from '../../roles.types';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';
import { usersFacade } from '../../store/users';

import { SITE_USER_OVERVIEW_TABS, USERS_OVERVIEW_COLUMNS } from './SiteUsersOverview.const';
import { UsersOverviewTableRow } from './SiteUsersOverview.types';

const SiteUsersOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;

	/**
	 * Hooks
	 */

	const { navigate, generatePath } = useNavigate(SITES_ROOT);
	const breadcrumbs = useRoutesBreadcrumbs(SITE_CONTEXT_DEFAULT_BREADCRUMBS, true);
	const [query, setQuery] = useAPIQueryParams(USERS_QUERY_PARAMS_CONFIG);
	const [loadingState, users, usersMeta] = useUsers();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const activeTabs = useActiveTabs(SITE_USER_OVERVIEW_TABS, location.pathname);
	const [t] = useCoreTranslation();
	const isTenantView = useMemo(() => activeTabs.find(tab => tab.active)?.target === 'tenant', [
		activeTabs,
	]);

	// Fetch users by site or tenant
	useEffect(() => {
		if (isTenantView) {
			usersFacade.getTenantUsersBySite(query as SearchParams, siteId);
			return;
		}

		usersFacade.getUsersBySite(query as SearchParams, siteId);
	}, [activeTabs, isTenantView, query, siteId]);

	// Set initial loading
	useEffect(() => {
		if (
			loadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState, mySecurityRightsLoadingState]);

	/**
	 * Methods
	 */

	const onSubmit = (formValues: FilterFormState): void => {
		setQuery({
			search: formValues.name,
			page: 1,
		});
	};

	const deleteAllFilters = (): void => {
		setQuery(DEFAULT_USERS_QUERY_PARAMS);
	};

	const deleteFilter = (item: OverviewFilterItem): void => {
		setQuery({ ...DEFAULT_USERS_QUERY_PARAMS, [item.filterKey]: undefined });
	};

	const handlePageChange = (page: number): void => {
		setQuery({ page });
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery(
			parseOrderByToObj({
				...orderBy,
				key: `meta.${orderBy.key}`,
			})
		);
	};

	const activeFilters = [
		{
			filterKey: 'search',
			valuePrefix: 'Zoekterm',
			value: query.search ?? '',
		},
	].filter(item => !!item.value);
	const activeSorting = parseObjToOrderBy({
		sort: query.sort ?? '',
		direction: query.direction ?? 1,
	});

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!users) {
			return null;
		}

		const usersRows: UsersOverviewTableRow[] = users.map(user => ({
			uuid: user.id,
			name: `${user.firstname} ${user.lastname}`,
			type: user.type,
			added: user.email,
			status: user.username || 'N/A',
			navigate: userUuid =>
				navigate(MODULE_PATHS.siteUserDetailRolesUpdate, { userUuid, siteId }),
		}));

		return (
			<>
				{isTenantView && (
					<div className="u-margin-top u-margin-bottom">
						<p>Bewerk tenant gebruikers om ze toegang te geven tot deze site.</p>
					</div>
				)}
				<div className="u-margin-top">
					<FilterForm
						initialState={{ name: query.search ?? '' }}
						onCancel={deleteAllFilters}
						onSubmit={onSubmit}
						deleteActiveFilter={deleteFilter}
						activeFilters={activeFilters}
					/>
				</div>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--xs"
					columns={USERS_OVERVIEW_COLUMNS(t, mySecurityRights)}
					rows={usersRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.pagesize}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={usersMeta?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
					loadDataMessage="Gebruikers ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</>
		);
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs}
				linkProps={(props: ContextHeaderTabLinkProps) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.siteUsersOverview}/${props.href}`, {
						siteId,
					}),
					component: Link,
				})}
				title="Gebruikers"
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.USERS_SITE_OVERVIEW}
				/>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default SiteUsersOverview;
