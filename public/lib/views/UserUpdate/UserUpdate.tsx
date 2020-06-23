import { Card } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { DataLoader, NavList } from '../../components';
import {
	useMySecurityRightsForTenant,
	useNavigate,
	useRoutesBreadcrumbs,
	useSites,
	useTenantRoles,
	useUser,
	useUserRolesForTenant,
} from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { ContentType, LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { sitesFacade } from '../../store/sites';
import { UserModel, usersFacade } from '../../store/users';

import { USER_UPDATE_NAV_LIST_ITEMS } from './UserUpdate.const';

const UserUpdate: FC<RolesRouteProps<{ userUuid?: string }>> = ({ route }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const breadcrumbs = useRoutesBreadcrumbs();
	const { userUuid } = useParams();
	const [userLoadingState, user] = useUser(userUuid);
	const [userRolesLoadingState, userRoles] = useUserRolesForTenant(userUuid);
	const [rolesLoadingState, roles] = useTenantRoles();
	const [sitesLoadingState, sites] = useSites();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForTenant(true);
	const { navigate } = useNavigate();

	useEffect(() => {
		if (userUuid) {
			usersFacade.getUser({ userUuid });
			usersFacade.getUserRolesForTenant({ userUuid });
			rolesFacade.getTenantRoles();
			sitesFacade.getSites({ id: userUuid });
			return;
		}
	}, [userUuid]);

	useEffect(() => {
		if (
			userLoadingState !== LoadingState.Loading &&
			userRolesLoadingState !== LoadingState.Loading &&
			rolesLoadingState !== LoadingState.Loading &&
			sitesLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [
		rolesLoadingState,
		sites,
		sitesLoadingState,
		userLoadingState,
		userRolesLoadingState,
		mySecurityRightsLoadingState,
	]);

	/**
	 * Functions
	 */
	const handleSubmit = (user: UserModel, content: any, contentType: ContentType): void => {
		switch (contentType) {
			case ContentType.UserRoles:
				usersFacade.updateUserRolesForTenant({
					userUuid: user.id,
					roles: content,
				});
				break;
			default:
				break;
		}
	};

	const handleCancel = (): void => {
		navigate(MODULE_PATHS.tenantUsersOverview);
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!user) {
			return null;
		}

		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			routes: route.routes,
			user,
			userRoles,
			roles,
			sites,
			mySecurityRights,
			onCancel: handleCancel,
			onSubmit: handleSubmit,
		});
	};

	return (
		<>
			<ContextHeader title={user ? `${user?.firstname} ${user?.lastname}` : ''}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-3 u-margin-bottom">
						<Card>
							<NavList
								items={USER_UPDATE_NAV_LIST_ITEMS.map(listItem => ({
									...listItem,
									to: generatePath(`${route.path}/${listItem.to}`, {
										userUuid,
									}),
								}))}
							/>
						</Card>
					</div>
					<div className="col-xs-9">
						<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
					</div>
				</div>
			</Container>
		</>
	);
};

export default UserUpdate;
