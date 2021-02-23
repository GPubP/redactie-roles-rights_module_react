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
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { ALERT_CONTAINER_IDS, MODULE_PATHS } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { usersFacade } from '../../store/users';

const UserDetailRolesUpdate: FC<RolesRouteProps<{ userUuid: string; siteUuid: string }>> = ({
	tenantId,
}) => {
	/**
	 * Hooks
	 */
	const { userUuid, siteUuid } = useParams<{ userUuid: string; siteUuid: string }>();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [userLoadingState, user] = useUser(userUuid);
	const { generatePath } = useNavigate();
	const extraBreadcrumbs = useMemo(() => {
		return [
			{
				name: 'Gebruikers',
				target: generatePath(`${MODULE_PATHS.tenantUsersOverview}`),
			},
			{
				name: user ? `${user.firstname} ${user.lastname}` : '...',
				target: generatePath(MODULE_PATHS.tenantUserDetail, {
					userUuid,
				}),
			},
		];
	}, [generatePath, tenantId, user, userUuid]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const { isUpdating } = useUsersLoadingStates();
	const [rolesLoadingState, roles] = useSiteRoles();
	const [siteLoadingState, site] = sitesConnector.hooks.useSite(siteUuid);
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();

	const [initialFormState, setInitialFormState] = useState<UserRolesFormState | null>(null);
	const [formState, setFormState] = useState<UserRolesFormState | null>(null);

	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading && isUpdating !== LoadingState.Loading,
		formState ?? initialFormState
	);

	useEffect(() => {
		if (userUuid && siteUuid) {
			usersFacade.getUserRolesForSite({
				userUuid,
				siteUuid,
			});
			usersFacade.getUser({ userUuid });
			rolesFacade.getSiteRoles(siteUuid);
		}
	}, [userUuid, siteUuid]);

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
	}, [rolesLoadingState, userLoadingState, siteLoadingState, userRolesLoadingState]);

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
	const handleSubmit = (values: UserRolesFormState): void => {
		usersFacade.updateUserRolesForSite(
			{
				userUuid,
				siteUuid,
				roles: values.roleIds,
			},
			ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_TENANT
		);
		resetDetectValueChanges();
	};

	const onCancel = (resetForm: FormikProps<UserRolesFormState>['resetForm']): void => {
		resetForm();
	};

	const pageTitle = (
		<>
			<i>{site?.data?.name || 'Site'}</i> Toegang
		</>
	);

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
						onSubmit={handleSubmit}
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
			<ContextHeader title={pageTitle}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="u-margin-bottom">
					<AlertContainer
						containerId={ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_TENANT}
					/>
				</div>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm}></DataLoader>
			</Container>
		</>
	);
};

export default UserDetailRolesUpdate;
