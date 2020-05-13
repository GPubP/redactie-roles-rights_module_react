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
import { useRoles, useRoutesBreadcrumbs, useUser, useUserRoles } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesService } from '../../store/roles';
import { usersService } from '../../store/users';

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
	const [rolesLoadingState, roles] = useRoles();

	useEffect(() => {
		if (userUuid) {
			usersService.getUser({ id: userUuid });
			usersService.getUserRoles({ id: userUuid });
			rolesService.getRoles();
			return;
		}
	}, [userUuid]);

	useEffect(() => {
		if (
			userLoadingState !== LoadingState.Loading &&
			userRolesLoadingState !== LoadingState.Loading &&
			rolesLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [rolesLoadingState, userLoadingState, userRolesLoadingState]);

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
			onCancel: () => console.log('cancel'),
			onSubmit: () => console.log('submit'),
		});
	};

	return (
		<>
			<ContextHeader title={user && `${user?.firstname} ${user?.lastname}`}>
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
