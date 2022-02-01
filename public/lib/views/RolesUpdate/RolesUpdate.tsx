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
	useOnNextRender,
	useWillUnmount,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { checkSecurityRights } from '../../helpers';
import {
	useMySecurityRightsForSite,
	useRolesLoadingStates,
	useRoutesBreadcrumbs,
	useSiteRole,
} from '../../hooks';
import {
	ALERT_CONTAINER_IDS,
	DEFAULT_ROLES_DETAIL_HEADER_BADGES,
	MODULE_PATHS,
	SecurityRightsSite,
	SITE_CONTEXT_DEFAULT_BREADCRUMBS,
	SITES_ROOT,
} from '../../roles.const';
import { RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId, roleId } = useParams<{ siteId: string; roleId: string }>();
	const { navigate } = useNavigate(SITES_ROOT);
	const [t] = useCoreTranslation();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [initialFormState, setInitialFormState] = useState<RoleDetailFormState | null>(null);
	const [formState, setFormState] = useState<RoleDetailFormState | null>(initialFormState);
	const { generatePath } = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const breadcrumbs = useRoutesBreadcrumbs(
		[
			...SITE_CONTEXT_DEFAULT_BREADCRUMBS,
			{
				name: 'Rollen',
				target: generatePath(`/sites${MODULE_PATHS.roles.overview}`, { siteId }),
			},
		],
		true
	);
	const rolesLoadingStates = useRolesLoadingStates();
	const [roleLoadingState, role] = useSiteRole();
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading &&
			rolesLoadingStates.isUpdatingSiteRole !== LoadingState.Loading &&
			!!role,
		formState ?? initialFormState
	);
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [forceNavigateToOverview] = useOnNextRender(() =>
		navigate(MODULE_PATHS.roles.overview, { siteId })
	);

	useWillUnmount(() => {
		rolesFacade.clearSiteRole();
	});

	useEffect(() => {
		if (role) {
			const state = {
				name: role.attributes.displayName,
				description: role.description,
				admin: role.attributes.admin,
			};
			setInitialFormState(state);
		}
	}, [role]);

	useEffect(() => {
		if (
			roleLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [mySecurityRightsLoadingState, roleLoadingState, rolesLoadingStates.isUpdatingSiteRole]);

	useEffect(() => {
		if (siteId && roleId) {
			rolesFacade.getSiteRole(siteId, roleId);
			return;
		}
	}, [roleId, siteId]);

	/**
	 * Methods
	 */
	const canDelete = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.RolesDelete],
		false
	);

	const canUpdate = checkSecurityRights(
		mySecurityRights,
		[SecurityRightsSite.RolesUpdate],
		false
	);

	const onSubmit = async (request: RoleDetailFormState): Promise<void> => {
		if (!siteId || !roleId) {
			return;
		}

		const isSuccesss = await rolesFacade.updateSiteRole({
			siteId,
			roleId,
			body: request,
		});

		if (isSuccesss) {
			setIsSubmitting(true);
			forceNavigateToOverview();
			resetDetectValueChanges();
		}
	};

	const onDelete = (role: RoleDetailFormState): void => {
		if (!siteId || !roleId) {
			return;
		}

		rolesFacade.deleteSiteRole({ siteId, roleId, body: role }).then(() => {
			setIsSubmitting(true);
			forceNavigateToOverview();
		});
	};

	const onCancel = (resetForm: FormikProps<RoleDetailFormState>['resetForm']): void => {
		resetForm();
		forceNavigateToOverview();
	};

	const pageTitle = `${
		role?.attributes?.displayName ? `'${role?.attributes?.displayName}'` : 'Rol'
	} ${t(CORE_TRANSLATIONS.ROUTING_UPDATE)}`;

	/**
	 * Render
	 */
	const renderRoleUpdate = (): ReactElement | null => {
		if (!initialFormState) {
			return null;
		}

		return (
			<RoleDetailForm
				readonly={!canUpdate}
				initialState={initialFormState}
				isLoading={rolesLoadingStates.isUpdatingSiteRole === LoadingState.Loading}
				isDeleting={rolesLoadingStates.isDeletingSiteRole === LoadingState.Loading}
				hasChanges={hasChanges}
				onCancel={onCancel}
				onSubmit={onSubmit}
				onChange={setFormState}
				onDelete={canDelete && !initialFormState?.admin && onDelete}
			>
				{({ submitForm }) => (
					<LeavePrompt when={hasChanges && !isSubmitting} onConfirm={submitForm} />
				)}
			</RoleDetailForm>
		);
	};

	return (
		<>
			<ContextHeader title={pageTitle} badges={DEFAULT_ROLES_DETAIL_HEADER_BADGES}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_CONTAINER_IDS.UPDATE_ROLE_ON_SITE}
				/>
				<DataLoader loadingState={initialLoading} render={renderRoleUpdate} />
			</Container>
		</>
	);
};

export default RolesUpdate;
