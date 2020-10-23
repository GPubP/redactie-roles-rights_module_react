import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { OrderBy } from '@redactie/translations-module/public/lib/services/api';
import { DataLoader, LoadingState, useNavigate } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SecurableRender } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useSiteRoles } from '../../hooks';
import { MODULE_PATHS, SecurityRightsSite, SITES_ROOT } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { rolesFacade } from '../../store/roles';

import { ROLES_OVERVIEW_COLUMNS } from './RolesOverview.const';
import { RolesOverviewTableRow } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams<{ siteId: string }>();
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const { navigate, generatePath } = useNavigate(SITES_ROOT);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [currentPage, setCurrentPage] = useState(DEFAULT_ROLES_SEARCH_PARAMS.skip);
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [activeSorting, setActiveSorting] = useState<OrderBy>();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		onlyKeys: true,
	});
	const [rolesLoadingState, roles] = useSiteRoles();

	useEffect(() => {
		if (siteId) {
			rolesFacade.getSiteRoles(siteId, rolesSearchParams);
		}
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (
			rolesLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [mySecurityRightsLoadingState, roles, rolesLoadingState]);

	/**
	 * Methods
	 */
	const handlePageChange = (pageNumber: number): void => {
		setCurrentPage(pageNumber);

		setRolesSearchParams({
			...rolesSearchParams,
			skip: pageNumber,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setRolesSearchParams({
			...rolesSearchParams,
			sort: `meta.${orderBy.key}`,
			direction: orderBy.order === 'desc' ? 1 : -1,
		});
		setActiveSorting(orderBy);
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
			target: generatePath(MODULE_PATHS.roles.detail, { siteId, roleId: role.id }),
		}));

		return (
			<>
				<PaginatedTable
					className="u-margin-top"
					columns={ROLES_OVERVIEW_COLUMNS(mySecurityRights)}
					rows={rolesRows}
					currentPage={currentPage}
					itemsPerPage={DEFAULT_ROLES_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
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
				<ContextHeaderActionsSection>
					<SecurableRender
						userSecurityRights={mySecurityRights}
						requiredSecurityRights={[SecurityRightsSite.RolesCreate]}
					>
						<Button
							iconLeft="plus"
							onClick={() => navigate(MODULE_PATHS.roles.create, { siteId })}
						>
							{t(CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
						</Button>
					</SecurableRender>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default RolesOverview;
