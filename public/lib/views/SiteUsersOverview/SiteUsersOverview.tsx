import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { DataLoader, LoadingState, useNavigate } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { FilterForm, FilterFormState } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useUsers } from '../../hooks';
import { MODULE_PATHS, SITE_CONTEXT_DEFAULT_BREADCRUMBS, SITES_ROOT } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';
import { usersFacade } from '../../store/users';

import { CONTENT_INITIAL_FILTER_STATE, USERS_OVERVIEW_COLUMNS } from './SiteUsersOverview.const';
import { FilterItemSchema, OrderBy, UsersOverviewTableRow } from './SiteUsersOverview.types';

const SiteUsersOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [currentPage, setCurrentPage] = useState(DEFAULT_USERS_SEARCH_PARAMS.page);
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [filterFormState, setFilterFormState] = useState<FilterFormState>(
		CONTENT_INITIAL_FILTER_STATE
	);
	const { navigate } = useNavigate(SITES_ROOT);
	const breadcrumbs = useRoutesBreadcrumbs(SITE_CONTEXT_DEFAULT_BREADCRUMBS);
	const [usersSearchParams, setUsersSearchParams] = useState(DEFAULT_USERS_SEARCH_PARAMS);
	const [loadingState, users, usersMeta] = useUsers();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [activeSorting, setActiveSorting] = useState<OrderBy>();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [t] = useCoreTranslation();

	useEffect(() => {
		usersFacade.getUsersBySite(usersSearchParams, siteId);
	}, [siteId, usersSearchParams]);

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

	const createFilterItems = ({
		name,
	}: FilterFormState): {
		filters: FilterItemSchema[];
	} => {
		const filters = [
			{
				filterKey: 'search',
				valuePrefix: 'Zoekterm',
				value: name,
			},
		];

		return {
			filters: [...filters].filter(item => !!item.value),
		};
	};

	const onSubmit = (filterFormState: FilterFormState): void => {
		//add item to filterItems for Taglist
		setFilterFormState(filterFormState);
		const filterItems = createFilterItems(filterFormState);
		setFilterItems(filterItems.filters);
		//add value to searchParams
		setUsersSearchParams({
			...usersSearchParams,
			search: filterFormState.name,
			page: 1,
		});
	};

	const deleteAllFilters = (): void => {
		//set empty array as Taglist
		const emptyFilter: [] = [];
		setFilterItems(emptyFilter);
		//delete search param from api call
		setUsersSearchParams(DEFAULT_USERS_SEARCH_PARAMS);
		setFilterFormState(CONTENT_INITIAL_FILTER_STATE);
	};

	const deleteFilter = (item: any): void => {
		//delete item from filterItems
		const setFilter = filterItems?.filter(el => el.value !== item.value);
		setFilterItems(setFilter);
		//set empty searchParams
		setUsersSearchParams(DEFAULT_USERS_SEARCH_PARAMS);
		setFilterFormState({
			...filterFormState,
			[item.filterKey]: '',
		});
	};

	const handlePageChange = (pageNumber: number): void => {
		setCurrentPage(pageNumber);

		setUsersSearchParams({
			...usersSearchParams,
			page: pageNumber,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setUsersSearchParams({
			...usersSearchParams,
			sort: `meta.${orderBy.key}`,
			direction: orderBy.order === 'desc' ? 1 : -1,
		});
		setActiveSorting(orderBy);
	};

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
				<div className="u-margin-top">
					<FilterForm
						initialState={filterFormState}
						onCancel={deleteAllFilters}
						onSubmit={onSubmit}
						deleteActiveFilter={deleteFilter}
						activeFilters={filterItems}
					/>
				</div>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--xs"
					columns={USERS_OVERVIEW_COLUMNS(t, mySecurityRights)}
					rows={usersRows}
					currentPage={currentPage}
					itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.pagesize}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={usersMeta?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
				></PaginatedTable>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Gebruikers">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default SiteUsersOverview;
