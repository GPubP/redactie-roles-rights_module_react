import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, ModulesList, RolesPermissionsList } from '../../components';
import { useRoutesBreadcrumbs, useSecurityRights } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { securityRightsFacade } from '../../store/securityRights';

import { fakeApi } from './RolesOverview.const';
import { RoleSecurityRight } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [loadingState, securityRightMatrix] = useSecurityRights();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	useEffect(() => {
		securityRightsFacade.getSecurityRightsBySite(rolesSearchParams, siteId);
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);
	/**
	 * Methods
	 */
	const handleClick = (module: string): any => {
		setRolesSearchParams({
			...rolesSearchParams,
			search: module,
		});
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!securityRightMatrix) {
			return null;
		}

		const fakeModules = fakeApi.modules;
		const fakePermissions = fakeApi.securityRights;
		const fakeRoles = fakeApi.roles;

		const newArray = fakePermissions.reduce((acc, right) => {
			const moduleIndex = fakeModules.findIndex(mod => mod.id === right.attributes.module);
			const newAcc = [...acc];
			newAcc[moduleIndex] = {
				...fakeModules[moduleIndex],
				securityRights: (acc[moduleIndex].securityRights || []).concat([right]),
			};
			return newAcc;
		}, fakeModules as RoleSecurityRight[]);

		const formState = fakePermissions.reduce((acc, right) => {
			acc[right.id] = fakeRoles.reduce((roleIds, role) => {
				const hasSecurityRight = role.securityRights.find(rightId => rightId === right.id);
				if (hasSecurityRight) {
					roleIds.push(role.role.id);
				}
				return roleIds;
			}, [] as string[]);

			return acc;
		}, {} as any);

		console.log(formState);

		return (
			<div className="row">
				<div className="col-xs-3">
					<ModulesList modules={fakeModules} onClick={handleClick} />
				</div>
				<div className="col-xs-8 u-margin-left">
					<RolesPermissionsList
						roles={securityRightMatrix.roles}
						permissions={newArray}
						formState={formState}
					/>
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
