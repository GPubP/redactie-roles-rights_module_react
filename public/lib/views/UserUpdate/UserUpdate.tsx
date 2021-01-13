import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	NavList,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	LeavePrompt,
	LoadingState,
	RenderChildRoutes,
	useDetectValueChanges,
} from '@redactie/utils';
import { FormikProps, FormikValues } from 'formik';
import { equals } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, NavLink, useParams } from 'react-router-dom';

import { UserRolesFormState } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import {
	useMySecurityRightsForTenant,
	useRoutesBreadcrumbs,
	useTenantRoles,
	useUser,
	useUserRolesForTenant,
	useUsersLoadingStates,
} from '../../hooks';
import { ALERT_CONTAINER_IDS, MODULE_PATHS } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { usersFacade } from '../../store/users';

import { USER_UPDATE_ALLOWED_PATHS, USER_UPDATE_NAV_LIST_ITEMS } from './UserUpdate.const';

const UserUpdate: FC<RolesRouteProps<{ userUuid?: string }>> = ({ route, tenantId }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const activeCompartmentFormikRef = useRef<FormikProps<FormikValues>>();
	const { userUuid } = useParams<{ userUuid: string }>();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Gebruikers',
			target: generatePath(`/${tenantId}${MODULE_PATHS.tenantUsersOverview}`),
		},
	]);
	const [userLoadingState, user] = useUser(userUuid);
	const { isUpdating } = useUsersLoadingStates();
	const [userRolesLoadingState, userRoles] = useUserRolesForTenant(userUuid);
	const [selectedRoles, setSelectedRoles] = useState<string[] | null>(null);
	const [rolesLoadingState, roles] = useTenantRoles();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForTenant(true);
	const [t] = useCoreTranslation();
	const [userRolesHasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading && isUpdating !== LoadingState.Loading,
		selectedRoles ?? mapUserRoles(userRoles)
	);
	const guardsMeta = useMemo(
		() => ({
			tenantId,
		}),
		[tenantId]
	);

	useEffect(() => {
		if (userUuid) {
			usersFacade.getUser({ userUuid });
			usersFacade.getUserRolesForTenant({ userUuid });
			rolesFacade.getTenantRoles();
			return;
		}
	}, [userUuid]);

	useEffect(() => {
		if (
			userLoadingState !== LoadingState.Loading &&
			userRolesLoadingState !== LoadingState.Loading &&
			rolesLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [rolesLoadingState, userLoadingState, userRolesLoadingState, mySecurityRightsLoadingState]);

	/**
	 * Functions
	 */
	const onSubmit = (): void => {
		if (user && userRolesHasChanges && selectedRoles) {
			usersFacade.updateUserRolesForTenant({
				userUuid: user.id,
				roles: selectedRoles,
			});
		}
		resetDetectValueChanges();
	};

	const onCancel = (): void => {
		if (activeCompartmentFormikRef.current) {
			activeCompartmentFormikRef.current.resetForm();
			resetDetectValueChanges();
		}
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!user || !userRoles) {
			return null;
		}

		const extraOptions = {
			user,
			userRoles,
			roles,
			mySecurityRights,
			formikRef: (instance: any) => {
				if (!equals(activeCompartmentFormikRef.current, instance)) {
					activeCompartmentFormikRef.current = instance;
				}
			},
			onChange: (values: UserRolesFormState) => {
				if (!equals(values.roleIds, selectedRoles)) {
					setSelectedRoles(values.roleIds.sort());
				}
			},
		};

		return (
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		);
	};

	return (
		<>
			<ContextHeader title={user ? `${user?.firstname} ${user?.lastname} bewerken` : ''}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="u-margin-bottom">
					<AlertContainer containerId={ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_TENANT} />
				</div>
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-12 col-sm-3 u-margin-bottom">
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
					<div className="col-xs-12 col-sm-9">
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
							disabled={isUpdating === LoadingState.Loading || !userRolesHasChanges}
							className="u-margin-left-xs"
							onClick={onSubmit}
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
			<LeavePrompt
				allowedPaths={USER_UPDATE_ALLOWED_PATHS}
				shouldBlockNavigationOnConfirm
				when={userRolesHasChanges}
				onConfirm={onSubmit}
			/>
		</>
	);
};

export default UserUpdate;
