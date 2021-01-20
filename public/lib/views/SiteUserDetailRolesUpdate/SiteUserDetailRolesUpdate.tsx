import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	LeavePrompt,
	LoadingState,
	useDetectValueChanges,
	useNavigate,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { DefaultFormActions, FormViewUserRoles, UserRolesFormState } from '../../components';
import { sitesConnector } from '../../connectors';
import { mapUserRoles } from '../../helpers';
import {
	useRoutesBreadcrumbs,
	useSiteRoles,
	useUser,
	useUserRolesForSite,
	useUsersLoadingStates,
} from '../../hooks';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { usersFacade } from '../../store/users';

const SiteUserDetailRolesUpdate: FC<RolesRouteProps> = ({ tenantId }) => {
	/**
	 * Hooks
	 */
	const { userUuid, siteId } = useParams<{ userUuid: string; siteId: string }>();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { isUpdating } = useUsersLoadingStates();
	const [userLoadingState, user] = useUser(userUuid);
	const [rolesLoadingState, roles] = useSiteRoles();
	const [siteLoadingState, site] = sitesConnector.hooks.useSite(siteId);
	const extraBreadcrumbs = useMemo(() => {
		return [
			{
				name: 'Gebruikers',
				target: '',
			},
			{
				name: 'Gebruikers',
				target: generatePath(`/${tenantId}/sites${MODULE_PATHS.siteRoot}`, {
					siteId,
				}),
			},
		];
	}, [site, siteId, tenantId]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();
	const [initialFormState, setInitialFormState] = useState<UserRolesFormState | null>(null);
	const [formState, setFormState] = useState<UserRolesFormState | null>(initialFormState);
	const { navigate } = useNavigate();

	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading && isUpdating !== LoadingState.Loading,
		formState ?? initialFormState
	);

	useEffect(() => {
		if (userUuid && siteId) {
			usersFacade.getUserRolesForSite({
				userUuid,
				siteUuid: siteId,
			});
			usersFacade.getUser({ userUuid });
			rolesFacade.getSiteRoles(siteId);
		}
	}, [siteId, userUuid]);

	useEffect(() => {
		if (
			userLoadingState !== LoadingState.Loading &&
			userRolesLoadingState !== LoadingState.Loading &&
			rolesLoadingState !== LoadingState.Loading &&
			siteLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [rolesLoadingState, siteLoadingState, userLoadingState, userRolesLoadingState]);

	useEffect(() => {
		if (userRoles) {
			setInitialFormState({
				roleIds: mapUserRoles(userRoles),
			});
		}
	}, [userRoles]);

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`/${SITES_ROOT}${MODULE_PATHS.users.overview}`, { siteId });
	};

	const onSubmit = (values: UserRolesFormState): void => {
		usersFacade
			.updateUserRolesForSite(
				{
					userUuid,
					siteUuid: siteId,
					roles: values.roleIds,
				},
				ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE
			)
			.then(() => {
				if (isEmpty(values.roleIds)) {
					setTimeout(() => navigateToOverview());
				}
			});

		resetDetectValueChanges();
	};

	const onCancel = (resetForm: FormikProps<UserRolesFormState>['resetForm']): void => {
		resetForm();
		setTimeout(() => navigateToOverview());
	};

	/**
	 * Render
	 */
	const renderSiteRolesForm = (): ReactElement | null => {
		if (!roles || !initialFormState) {
			return null;
		}
		return (
			<div className="u-margin-bottom-lg">
				<h3>Rollen</h3>
				<div className="u-margin-top">
					<FormViewUserRoles
						initialState={initialFormState}
						availableRoles={roles}
						onChange={value => {
							setFormState({
								roleIds: value.roleIds.sort(),
							});
						}}
						onSubmit={onSubmit}
					>
						{({ submitForm }) => (
							<>
								<DefaultFormActions
									isLoading={isUpdating === LoadingState.Loading}
									onCancel={onCancel}
									hasChanges={hasChanges}
								/>
								<LeavePrompt
									shouldBlockNavigationOnConfirm
									when={hasChanges}
									onConfirm={submitForm}
								/>
							</>
						)}
					</FormViewUserRoles>
				</div>
			</div>
		);
	};

	return (
		<>
			<ContextHeader title={user ? `${user?.firstname} ${user?.lastname}` : ''}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="u-margin-bottom">
					<AlertContainer
						containerId={ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE}
					/>
				</div>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm}></DataLoader>
			</Container>
		</>
	);
};

export default SiteUserDetailRolesUpdate;
