import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	NavList,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, NavLink, useParams } from 'react-router-dom';

import { DataLoader } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import {
	useMySecurityRightsForTenant,
	useNavigate,
	useRoutesBreadcrumbs,
	useSites,
	useTenantRoles,
	useUser,
	useUserRolesForTenant,
	useUsersLoadingStates,
} from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { sitesFacade } from '../../store/sites';
import { usersFacade } from '../../store/users';

import { USER_UPDATE_NAV_LIST_ITEMS } from './UserUpdate.const';

const UserUpdate: FC<RolesRouteProps<{ userUuid?: string }>> = ({ route, tenantId }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { userUuid } = useParams();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Gebruikers',
			target: generatePath(`/${tenantId}${MODULE_PATHS.tenantUsersOverview}`),
		},
	]);
	const [userLoadingState, user] = useUser(userUuid);
	const { isUpdating } = useUsersLoadingStates();
	const [userRolesLoadingState, userRoles] = useUserRolesForTenant(userUuid);
	const [selectedRoles] = useState(mapUserRoles(userRoles));
	const [rolesLoadingState, roles] = useTenantRoles();
	const [sitesLoadingState, sites] = useSites();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForTenant(true);
	const { navigate } = useNavigate();
	const [t] = useCoreTranslation();

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
	const onSubmit = (): void => {
		if (user && mapUserRoles(userRoles) !== selectedRoles) {
			usersFacade.updateUserRolesForTenant({
				userUuid: user.id,
				roles: selectedRoles,
			});
		}
	};

	const onCancel = (): void => {
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
									activeClassName: 'is-active',
									to: generatePath(`${route.path}/${listItem.to}`, {
										userUuid,
									}),
								}))}
								linkComponent={NavLink}
							/>
						</Card>
					</div>
					<div className="col-xs-9">
						<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
					</div>
				</div>
			</Container>
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper row end-xs">
						<Button onClick={onCancel} negative>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						<Button
							iconLeft={
								isUpdating === LoadingState.Loading
									? 'circle-o-notch fa-spin'
									: null
							}
							disabled={isUpdating === LoadingState.Loading}
							className="u-margin-left-xs"
							onClick={onSubmit}
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default UserUpdate;
