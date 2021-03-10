import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	DataLoader,
	LoadingState,
	SearchParams,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SecurableRender } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useSiteRoles } from '../../hooks';
import {
	MODULE_PATHS,
	ROLES_QUERY_PARAMS_CONFIG,
	SecurityRightsSite,
	SITE_CONTEXT_DEFAULT_BREADCRUMBS,
	SITES_ROOT,
} from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

import { ROLES_OVERVIEW_COLUMNS } from './RolesOverview.const';
import { RolesOverviewTableRow } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams<{ siteId: string }>();
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs(SITE_CONTEXT_DEFAULT_BREADCRUMBS);
	const { navigate, generatePath } = useNavigate(SITES_ROOT);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [query, setQuery] = useAPIQueryParams(ROLES_QUERY_PARAMS_CONFIG);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [rolesLoadingState, roles] = useSiteRoles();

	useEffect(() => {
		if (siteId) {
			rolesFacade.getSiteRoles(siteId, query as SearchParams);
		}
	}, [query, siteId]);

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
	const handlePageChange = (page: number): void => {
		setQuery({ page });
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		const rolesRows: RolesOverviewTableRow[] = (roles || []).map(role => ({
			uuid: role.id,
			name: role.attributes.displayName || '',
			description: role.description || '',
			admin: role.attributes.admin || false,
			target: generatePath(MODULE_PATHS.roles.detail, { siteId, roleId: role.id }),
		}));

		return (
			<>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--xs"
					columns={ROLES_OVERVIEW_COLUMNS(mySecurityRights, t)}
					rows={rolesRows}
					currentPage={query.page ?? 1}
					itemsPerPage={query.pagesize}
					onPageChange={handlePageChange}
					totalValues={roles?.length || 0}
					loading={rolesLoadingState === LoadingState.Loading}
					loadDataMessage="Rollen ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
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
