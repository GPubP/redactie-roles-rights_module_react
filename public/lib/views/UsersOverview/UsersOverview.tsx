import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader } from '../../components';
import { useNavigate, useRoutesBreadcrumbs, useUsers } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_USERS_SEARCH_PARAMS } from '../../services/users/users.service.const';

import { USERS_OVERVIEW_COLUMNS } from './UsersOverview.const';
import { OrderBy, UsersOverviewTableRow } from './UsersOverview.types';

const UsersOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
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
		if (!users?.data) {
			return null;
		}

		const usersRows: UsersOverviewTableRow[] = users.data.map(user => ({
			uuid: user.uuid as string,
			name: user.name,
			type: user.type,
			added: user.added,
			status: user.status || 'N/A',
			navigate: userUuid => navigate(MODULE_PATHS.users.overview, { userUuid }),
		}));

		return (
			<div className="u-container u-wrapper">
				<div className="u-margin-top"></div>
				<PaginatedTable
					className="u-margin-top"
					columns={USERS_OVERVIEW_COLUMNS}
					rows={usersRows}
					currentPage={
						Math.ceil(users.paging.skip / DEFAULT_USERS_SEARCH_PARAMS.limit) + 1
					}
					itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={users?.paging?.total || 0}
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
