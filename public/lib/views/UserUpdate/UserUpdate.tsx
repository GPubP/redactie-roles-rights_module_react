import { Card } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, Redirect, useParams } from 'react-router-dom';

import { DataLoader, NavList } from '../../components';
import { useRoutesBreadcrumbs, useSites, useTenantRoles, useUser, useUserRoles } from '../../hooks';
import { ContentType, LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { sitesFacade } from '../../store/sites';
import { UserModel, usersFacade } from '../../store/users';

import { USER_UPDATE_NAV_LIST_ITEMS } from './UserUpdate.const';

const UserUpdate: FC<RolesRouteProps<{ userUuid?: string }>> = ({ route, match }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const breadcrumbs = useRoutesBreadcrumbs();
	const { userUuid } = useParams();
	const [userLoadingState, user] = useUser(userUuid);
	const [userRolesLoadingState, userRoles] = useUserRoles(userUuid);
	const [rolesLoadingState, roles] = useTenantRoles();
	const [sitesLoadingState, sites] = useSites();

	useEffect(() => {
		if (userUuid) {
			usersFacade.getUser({ id: userUuid });
			usersFacade.getUserRoles({ id: userUuid });
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
			sitesLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [rolesLoadingState, sites, sitesLoadingState, userLoadingState, userRolesLoadingState]);

	/**
	 * Functions
	 */
	const handleSubmit = (user: UserModel, content: any, contentType: ContentType): void => {
		switch (contentType) {
			case ContentType.UserRoles:
				usersFacade.updateUserRoles({ id: user.id, roles: content });
				break;
			default:
				break;
		}
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!user) {
			return null;
		}

		const uuidRegex =
			'\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b';

		// Redirect /users/:userUuid to /users/:userUuid/algemeen
		if (new RegExp(`/users/${uuidRegex}$`).test(location.pathname)) {
			return <Redirect to={`${match.url}/algemeen`} />;
		}

		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			routes: route.routes,
			user,
			userRoles,
			roles,
			sites,
			onCancel: () => console.log('cancel'),
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
