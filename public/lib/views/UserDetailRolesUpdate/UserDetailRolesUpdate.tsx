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
import { mapUserRoles } from '../../helpers';
import {
	useRoutesBreadcrumbs,
	useSite,
	useSiteRoles,
	useUser,
	useUserRolesForSite,
	useUsersLoadingStates,
} from '../../hooks';
import { ALERT_CONTAINER_IDS, MODULE_PATHS } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { sitesFacade } from '../../store/sites';
import { usersFacade } from '../../store/users';

const UserDetailRolesUpdate: FC<RolesRouteProps<{ userUuid: string; siteUuid: string }>> = () => {
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
				name: user ? `${user.firstname} ${user.lastname}` : '...',
				target: generatePath(MODULE_PATHS.tenantUserDetail, {
					userUuid,
				}),
			},
			// The last breadcrumb will be removed so we need to set a dummy
			// breadcrumb to make sure that the user breadcrumb is visible
			{
				name: 'last',
				target: '',
			},
		];
	}, [user, generatePath, userUuid]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const { isUpdating } = useUsersLoadingStates();
	const [rolesLoadingState, roles] = useSiteRoles();
	const [siteLoadingState, site] = useSite();
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
			sitesFacade.getSite({ id: siteUuid });
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
			<ContextHeader title={site ? `${site.data.name} toegang` : ''}>
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
