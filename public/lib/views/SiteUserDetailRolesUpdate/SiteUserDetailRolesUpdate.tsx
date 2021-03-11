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
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();
	const [initialFormState, setInitialFormState] = useState<UserRolesFormState | null>(null);
	const [formState, setFormState] = useState<UserRolesFormState | null>(initialFormState);
	const { navigate } = useNavigate(SITES_ROOT);

	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading && isUpdating !== LoadingState.Loading,
		formState ?? initialFormState
	);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});

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
		if (userRoles) {
			setInitialFormState({
				roleIds: mapUserRoles(userRoles),
			});
		}
	}, [userRoles]);

	/**
	 * Methods
	 */
	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.UsersUpdateSiteRoles],
		false
	);

	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.users.siteOverview}`, { siteId });
	};

	useEffect(() => {
		isSubmitting && navigateToOverview();
	}, [isSubmitting]); // eslint-disable-line

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
				resetDetectValueChanges();
				setIsSubmitting(true);
			});
	};

	const onCancel = (resetForm: FormikProps<UserRolesFormState>['resetForm']): void => {
		resetForm();
		setIsSubmitting(true);
	};

	const pageTitle = (
		<>
			<i>{user ? `${user?.firstname} ${user?.lastname}` : 'Gebruiker'}</i>{' '}
			{t(CORE_TRANSLATIONS.ROUTING_UPDATE)}
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
											shouldBlockNavigationOnConfirm
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
				<div className="u-margin-bottom">
					<AlertContainer
						containerId={ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE}
					/>
				</div>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm} />
			</Container>
		</>
	);
};

export default SiteUserDetailRolesUpdate;
