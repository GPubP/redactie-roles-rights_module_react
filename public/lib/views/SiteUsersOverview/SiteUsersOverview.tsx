import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, FilterForm, FilterFormState } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs, useSiteNavigate, useUsers } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';
import { usersFacade } from '../../store/users';

import { CONTENT_INITIAL_FILTER_STATE, USERS_OVERVIEW_COLUMNS } from './SiteUsersOverview.const';
import { FilterItemSchema, OrderBy, UsersOverviewTableRow } from './SiteUsersOverview.types';

const SiteUsersOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [currentPage, setCurrentPage] = useState(DEFAULT_USERS_SEARCH_PARAMS.skip);
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [filterFormState, setFilterFormState] = useState<FilterFormState>(
		CONTENT_INITIAL_FILTER_STATE
	);
	const { navigate } = useSiteNavigate();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [usersSearchParams, setUsersSearchParams] = useState(DEFAULT_USERS_SEARCH_PARAMS);
	const [loadingState, users, usersMeta] = useUsers();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [activeSorting, setActiveSorting] = useState<OrderBy>();
	const [t] = useCoreTranslation();

	useEffect(() => {
		usersFacade.getUsersBySite(usersSearchParams, siteId);
	}, [siteId, usersSearchParams]);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);
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
			skip: 0,
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
			skip: pageNumber,
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
					className="u-margin-top"
					columns={USERS_OVERVIEW_COLUMNS(t)}
					rows={usersRows}
					currentPage={currentPage}
					itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={usersMeta?.totalElements}
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
