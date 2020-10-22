import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { DataLoader, LeavePrompt, LoadingState, useDetectValueChanges } from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { checkSecurityRights } from '../../helpers';
import {
	useMySecurityRightsForSite,
	useRolesLoadingStates,
	useRoutesBreadcrumbs,
	useSiteNavigate,
	useSiteRole,
} from '../../hooks';
import { MODULE_PATHS, SecurityRightsSite, TENANT_ROOT } from '../../roles.const';
import { RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId, roleId } = useParams<{ siteId: string; roleId: string }>();
	const { navigate } = useSiteNavigate();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [initialFormState, setInitialFormState] = useState<RoleDetailFormState | null>(null);
	const [formState, setFormState] = useState<RoleDetailFormState | null>(initialFormState);
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();
	const [roleLoadingState, role] = useSiteRole();
	const [allowedPaths, setAllowedPaths] = useState<string[]>([]);

	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading &&
			rolesLoadingStates.isUpdatingSiteRole !== LoadingState.Loading,
		formState ?? initialFormState
	);

	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		onlyKeys: true,
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

	const navigateToOverview = (): void => {
		navigate(MODULE_PATHS.roles.overview, { siteId });
	};

	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId && roleId) {
			rolesFacade.updateSiteRole({
				siteId,
				roleId,
				body: request,
			});
		}
		resetDetectValueChanges();
	};

	const onDelete = (): void => {
		if (siteId && roleId) {
			setAllowedPaths([`${TENANT_ROOT}/sites${MODULE_PATHS.roles.overview}`]);
			rolesFacade
				.deleteSiteRole({ siteId, roleId })
				.then(navigateToOverview)
				.finally(() => setAllowedPaths([]));
		}
	};

	const onCancel = (resetForm: FormikProps<RoleDetailFormState>['resetForm']): void => {
		resetForm();
	};

	/**
	 * Render
	 */
	const renderRoleUpdate = (): ReactElement | null => {
		if (!initialFormState) {
			return null;
		}

		return (
			<RoleDetailForm
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
					<LeavePrompt
						allowedPaths={allowedPaths}
						shouldBlockNavigationOnConfirm
						when={hasChanges}
						onConfirm={submitForm}
					/>
				)}
			</RoleDetailForm>
		);
	};

	return (
		<>
			<ContextHeader title="Rol bewerken">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderRoleUpdate} />
			</Container>
		</>
	);
};

export default RolesUpdate;
