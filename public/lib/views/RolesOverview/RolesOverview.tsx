import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { OrderBy } from '@redactie/translations-module/public/lib/services/api';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, SecurableRender } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import {
	useMySecurityRightsForSite,
	useNavigate,
	useRoutesBreadcrumbs,
	useSiteRoles,
} from '../../hooks';
import { MODULE_PATHS, SecurityRightsSite } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { rolesFacade } from '../../store/roles';

import { ROLES_OVERVIEW_COLUMNS } from './RolesOverview.const';
import { RolesOverviewTableRow } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams();
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const { navigate } = useNavigate();
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
			navigate: (roleId: string) =>
				navigate(`/sites${MODULE_PATHS.roles.detail}`, { siteId, roleId }),
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
						userSecurityRights={mySecurityRights as string[]}
						requiredSecurityRights={[SecurityRightsSite.RolesCreate]}
					>
						<Button
							iconLeft="plus"
							onClick={() =>
								navigate(`/sites${MODULE_PATHS.roles.create}`, { siteId })
							}
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
