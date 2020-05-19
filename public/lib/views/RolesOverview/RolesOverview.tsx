import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, ModulesList, RolesPermissionsList } from '../../components';
import { useRoles, useRoutesBreadcrumbs } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { rolesService } from '../../store/securityRights';

import { fakeApi } from './RolesOverview.const';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [loadingState, roles] = useRoles();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	useEffect(() => {
		rolesService.getRolesBySite(rolesSearchParams, siteId);
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);
	/**
	 * Methods
	 */

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!roles) {
			return null;
		}

		console.log(roles);
		const modules = fakeApi.modules;
		const fakeRoles = fakeApi.roles;
		const securityRights = fakeApi.securityRights;

		return (
			<div className="row">
				<div className="col-xs-3">
					<ModulesList modules={modules} />
				</div>
				<div className="col-xs-8 u-margin-left">
					<RolesPermissionsList roles={fakeRoles} permissions={securityRights} />
				</div>
			</div>
		);
	};

	return (
		<>
			<ContextHeader title="Rollen en rechten">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default RolesOverview;
