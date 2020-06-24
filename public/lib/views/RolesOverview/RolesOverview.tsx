import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, FilterForm, FilterFormState } from '../../components';
import { useRoutesBreadcrumbs, useSiteRoles } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { rolesFacade } from '../../store/roles';

import { CONTENT_INITIAL_FILTER_STATE, ROLES_OVERVIEW_COLUMNS } from './RolesOverview.const';
import { FilterItemSchema, RolesOverviewTableRow } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [filterFormState, setFilterFormState] = useState<FilterFormState>(
		CONTENT_INITIAL_FILTER_STATE
	);
	const [rolesLoadingState, roles] = useSiteRoles();

	useEffect(() => {
		if (siteId) {
			rolesFacade.getSiteRoles(siteId, rolesSearchParams);
		}
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (rolesLoadingState !== LoadingState.Loading) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [roles, rolesLoadingState]);

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
		setRolesSearchParams({
			...rolesSearchParams,
			search: filterFormState.name,
			skip: 0,
		});
	};

	const deleteAllFilters = (): void => {
		//set empty array as Taglist
		const emptyFilter: [] = [];
		setFilterItems(emptyFilter);
		//delete search param from api call
		setRolesSearchParams(DEFAULT_ROLES_SEARCH_PARAMS);
		setFilterFormState(CONTENT_INITIAL_FILTER_STATE);
	};

	const deleteFilter = (item: any): void => {
		//delete item from filterItems
		const setFilter = filterItems?.filter(el => el.value !== item.value);
		setFilterItems(setFilter);
		//set empty searchParams
		setRolesSearchParams(DEFAULT_ROLES_SEARCH_PARAMS);
		setFilterFormState({
			...filterFormState,
			[item.filterKey]: '',
		});
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!roles) {
			return null;
		}

		const rolesRows: RolesOverviewTableRow[] = roles.map(role => ({
			uuid: role.id,
			name: role.attributes.displayName || '',
			description: role.description || '',
			admin: role.attributes.admin || false,
			navigate: (roleId: string) => console.log('role', roleId),
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
					columns={ROLES_OVERVIEW_COLUMNS()}
					rows={rolesRows}
					currentPage={1}
					itemsPerPage={DEFAULT_ROLES_SEARCH_PARAMS.limit}
					onPageChange={() => console.log('change page')}
					orderBy={() => console.log('order by')}
					totalValues={roles?.length}
					loading={rolesLoadingState === LoadingState.Loading}
				></PaginatedTable>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Rollen">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default RolesOverview;
