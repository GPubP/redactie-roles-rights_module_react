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
	useDetectValueChangesWorker,
	useNavigate,
	useOnNextRender,
	useWillUnmount,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { DefaultFormActions, FormViewUserRoles, UserRolesFormState } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { checkSecurityRights, mapUserRoles } from '../../helpers';
import {
	useMySecurityRightsForSite,
	useRoutesBreadcrumbs,
	useSiteRoles,
	useUser,
	useUserRolesForSite,
	useUsersLoadingStates,
} from '../../hooks';
import {
	ALERT_CONTAINER_IDS,
	DEFAULT_USER_DETAIL_HEADER_BADGES,
	MODULE_PATHS,
	SecurityRightsSite,
	SITE_CONTEXT_DEFAULT_BREADCRUMBS,
	SITES_ROOT,
} from '../../roles.const';
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
	const [t] = useCoreTranslation();
	const [userLoadingState, user] = useUser(userUuid);
	const [rolesLoadingState, roles] = useSiteRoles();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const extraBreadcrumbs = useMemo(() => {
		return [
			...SITE_CONTEXT_DEFAULT_BREADCRUMBS,
			{
				name: 'Overzicht',
				target: generatePath(`/${tenantId}/sites${MODULE_PATHS.siteRoot}`, {
					siteId,
				}),
			},
		];
	}, [siteId, tenantId]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs, true);
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();
	const [initialFormState, setInitialFormState] = useState<UserRolesFormState | undefined>();
	const [formState, setFormState] = useState<UserRolesFormState | undefined>(initialFormState);
	const { navigate } = useNavigate(SITES_ROOT);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChangesWorker(
		initialLoading !== LoadingState.Loading && isUpdating !== LoadingState.Loading,
		formState,
		BFF_MODULE_PUBLIC_PATH
	);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [forceNavigateToOverview] = useOnNextRender(() =>
		navigate(`${MODULE_PATHS.users.siteOverview}`, { siteId })
	);

	useWillUnmount(() => {
		usersFacade.clearUser();
	});

	useEffect(() => {
		if (userUuid && siteId) {
			usersFacade.getUserRolesForSite({
				userUuid,
				siteUuid: siteId,
			});
			usersFacade.getTenantUserBySite({ userUuid }, siteId);
			rolesFacade.getSiteRoles(siteId);
		}
	}, [siteId, userUuid]);

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
	}, [mySecurityRightsLoadingState, rolesLoadingState, userLoadingState, userRolesLoadingState]);

	useEffect(() => {
		const roleIds = userRoles ? mapUserRoles(userRoles) : [];

		if (userRolesLoadingState !== LoadingState.Loading) {
			setInitialFormState({
				roleIds,
			});
		}

		if (userRoles || userRolesLoadingState === LoadingState.Error) {
			setFormState({
				roleIds,
			});
		}
	}, [userRoles, userRolesLoadingState]);

	/**
	 * Methods
	 */
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.UsersUpdateSiteRoles],
		false
	);

	const onSubmit = (values: UserRolesFormState): void => {
		usersFacade
			.updateUserRolesForSite(
				{
					userUuid,
					siteUuid: siteId,
					roles: values.roleIds,
				},
				{
					errorAlertContainerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
					successAlertContainerId: ALERT_CONTAINER_IDS.USERS_SITE_OVERVIEW,
				}
			)
			.then(() => {
				resetDetectValueChanges();
				setIsSubmitting(true);
				forceNavigateToOverview();
			});
	};

	const onCancel = (resetForm: FormikProps<UserRolesFormState>['resetForm']): void => {
		resetForm();
		setIsSubmitting(true);
		forceNavigateToOverview();
	};

	const pageTitle = `${
		user?.firstname ? `'${user?.firstname} ${user?.lastname}'` : 'Gebruiker'
	} ${t(CORE_TRANSLATIONS.ROUTING_UPDATE)}`;

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
						readonly={!canUpdate}
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
								{canUpdate && (
									<>
										<DefaultFormActions
											isLoading={isUpdating === LoadingState.Loading}
											onCancel={onCancel}
											hasChanges={hasChanges}
										/>
										<LeavePrompt
											when={hasChanges && !isSubmitting}
											onConfirm={submitForm}
										/>
									</>
								)}
							</>
						)}
					</FormViewUserRoles>
				</div>
			</div>
		);
	};

	return (
		<>
			<ContextHeader title={pageTitle} badges={DEFAULT_USER_DETAIL_HEADER_BADGES}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE}
				/>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm} />
			</Container>
		</>
	);
};

export default SiteUserDetailRolesUpdate;
