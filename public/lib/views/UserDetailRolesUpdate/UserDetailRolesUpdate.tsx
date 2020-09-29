import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { FormikProps } from 'formik';
import { equals } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, FormViewUserRoles, UserRolesFormState } from '../../components';
import { mapUserRoles } from '../../helpers';
import {
	useNavigate,
	useRoutesBreadcrumbs,
	useSite,
	useSiteRoles,
	useUser,
	useUserRolesForSite,
	useUsersLoadingStates,
} from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
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
	const [formState, setFormState] = useState<UserRolesFormState | null>(initialFormState);
	const isChanged = useMemo(() => {
		if (formState === null) {
			return false;
		}
		return !equals(initialFormState, formState);
	}, [formState, initialFormState]);

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
		usersFacade.updateUserRolesForSite({
			userUuid,
			siteUuid,
			roles: values.roleIds,
		});
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
						isChanged={isChanged}
						isLoading={isUpdating === LoadingState.Loading}
						onChange={setFormState}
						onSubmit={handleSubmit}
						onCancel={onCancel}
					/>
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
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm}></DataLoader>
			</Container>
		</>
	);
};

export default UserDetailRolesUpdate;
