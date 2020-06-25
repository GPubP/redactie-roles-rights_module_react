import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, RoleDetailForm } from '../../components';
import { checkSecurityRights } from '../../helpers';
import {
	useMySecurityRightsForSite,
	useNavigate,
	useRolesLoadingStates,
	useRoutesBreadcrumbs,
	useSiteRole,
} from '../../hooks';
import { MODULE_PATHS, SecurityRightsSite } from '../../roles.const';
import { LoadingState, RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId, roleId } = useParams();
	const { navigate } = useNavigate();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [formState, setFormState] = useState<any | null>(null);
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();
	const [roleLoadingState, role] = useSiteRole();
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		onlyKeys: true,
	});

	useEffect(() => {
		if (role) {
			setFormState({
				name: role.attributes.displayName,
				description: role.description,
				admin: role.attributes.admin,
			});
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
		navigate(`/sites${MODULE_PATHS.roles.overview}`, { siteId });
	};

	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId && roleId) {
			rolesFacade
				.updateSiteRole({
					siteId,
					roleId,
					body: request,
				})
				.then(navigateToOverview);
		}
	};

	const onDelete = (): void => {
		if (siteId && roleId) {
			rolesFacade.deleteSiteRole({ siteId, roleId }).then(navigateToOverview);
		}
	};

	/**
	 * Render
	 */
	const renderRoleUpdate = (): ReactElement | null => {
		if (!formState) {
			return null;
		}

		return (
			<RoleDetailForm
				initialState={formState}
				isLoading={rolesLoadingStates.isUpdatingSiteRole === LoadingState.Loading}
				isDeleting={rolesLoadingStates.isDeletingSiteRole === LoadingState.Loading}
				onCancel={navigateToOverview}
				onSubmit={onSubmit}
				onDelete={canDelete && !formState.admin && onDelete}
			/>
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
