import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { FilterForm, FilterFormState } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { getUserName } from '../../helpers/getUserName';
import { useMySecurityRightsForTenant, useRoutesBreadcrumbs, useUsers } from '../../hooks';
import {
	ALERT_CONTAINER_IDS,
	DEFAULT_USERS_QUERY_PARAMS,
	MODULE_PATHS,
	USERS_QUERY_PARAMS_CONFIG,
} from '../../roles.const';
import { OverviewFilterItem, RolesRouteProps } from '../../roles.types';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';
import { usersFacade } from '../../store/users';

import { USERS_OVERVIEW_COLUMNS } from './UsersOverview.const';
import { UsersOverviewTableRow } from './UsersOverview.types';

const UsersOverview: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */

	const { navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [query, setQuery] = useAPIQueryParams(USERS_QUERY_PARAMS_CONFIG);
	const [loadingState, users, usersMeta] = useUsers();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForTenant(true);
	const [t] = useCoreTranslation();

	// Fetch users on every query change
	useEffect(() => {
		usersFacade.getUsers(query as SearchParams);
	}, [query]);

	// Set initial loading state
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
		setQuery({ ...DEFAULT_USERS_SEARCH_PARAMS, [item.filterKey]: undefined });
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
	].filter(filter => !!filter.value);
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
			name: getUserName(user),
			type: user.type,
			navigate: (userUuid: string) =>
				navigate(MODULE_PATHS.tenantUserDetailRoles, { userUuid }),
		}));

		return (
			<>
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
					itemsPerPage={
						DEFAULT_USERS_SEARCH_PARAMS.pagesize !== -1
							? DEFAULT_USERS_SEARCH_PARAMS.pagesize
							: usersMeta?.totalElements || 0
					}
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
			<ContextHeader title="Gebruikers">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="u-margin-bottom">
					<AlertContainer containerId={ALERT_CONTAINER_IDS.USERS_OVERVIEW} />
				</div>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default UsersOverview;
