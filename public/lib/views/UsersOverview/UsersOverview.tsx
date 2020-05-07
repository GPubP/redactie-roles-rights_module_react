import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, FilterForm } from '../../components';
import { useNavigate, useRoutesBreadcrumbs, useUsers } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { generateFilterFormState } from '../../roles.helpers';
import { FilterFormState, LoadingState, RolesRouteProps } from '../../roles.types';
import { FilterItemSchema } from '../../services/filterItems';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';

import { USERS_OVERVIEW_COLUMNS } from './UsersOverview.const';
import { OrderBy, UsersOverviewTableRow } from './UsersOverview.types';

const UsersOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const { navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [usersSearchParams, setUsersSearchParams] = useState(DEFAULT_USERS_SEARCH_PARAMS);
	const [loadingState, users] = useUsers(usersSearchParams);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [activeSorting, setActiveSorting] = useState<OrderBy>();

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);
	/**
	 * Methods
	 */

	const onSubmit = ({ name }: FilterFormState): void => {
		//add item to filterItems for Taglist
		const request = { label: name, value: name };
		setFilterItems([request]);
		//add value to searchParams
		setUsersSearchParams({
			...usersSearchParams,
			search: name,
			skip: 0,
		});
	};

	const deleteAllFilters = (): void => {
		//set empty array as Taglist
		const emptyFilter: [] = [];
		setFilterItems(emptyFilter);
		//delete search param from api call
		setUsersSearchParams(DEFAULT_USERS_SEARCH_PARAMS);
	};

	const deleteFilter = (item: any): void => {
		//delete item from filterItems
		const setFilter = filterItems?.filter(el => el.value !== item.value);
		setFilterItems(setFilter);
		//set empty searchParams
		setUsersSearchParams(DEFAULT_USERS_SEARCH_PARAMS);
	};

	const handlePageChange = (page: number): void => {
		setUsersSearchParams({
			...usersSearchParams,
			skip: (page - 1) * DEFAULT_USERS_SEARCH_PARAMS.limit,
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
		if (!users?._embedded) {
			return null;
		}

		const usersRows: UsersOverviewTableRow[] = users._embedded.map(user => ({
			uuid: user.id,
			name: user.firstname + user.lastname,
			type: user.type,
			added: user.email,
			status: user.username || 'N/A',
			navigate: userUuid => navigate(MODULE_PATHS.users.overview, { userUuid }),
		}));

		return (
			<div className="u-container u-wrapper">
				<div className="u-margin-top">
					<FilterForm
						initialState={generateFilterFormState()}
						onCancel={deleteAllFilters}
						onSubmit={onSubmit}
						deleteActiveFilter={deleteFilter}
						activeFilters={filterItems}
					/>
				</div>
				<PaginatedTable
					className="u-margin-top"
					columns={USERS_OVERVIEW_COLUMNS}
					rows={usersRows}
					currentPage={
						Math.ceil(users._page.totalPages / DEFAULT_USERS_SEARCH_PARAMS.limit) + 1
					}
					itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={users?._page?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
				></PaginatedTable>
			</div>
		);
	};

	return (
		<>
			<ContextHeader title="Gebruikers">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<Button
						onClick={() => navigate(MODULE_PATHS.users.overview, { siteId })}
						iconLeft="plus"
					>
						Nieuwe maken
					</Button>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default UsersOverview;
