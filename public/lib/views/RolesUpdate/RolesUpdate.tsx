import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, RoleDetailForm } from '../../components';
import { useRolesLoadingStates, useRoutesBreadcrumbs, useSiteRole } from '../../hooks';
import { LoadingState, RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId, roleId } = useParams();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [formState, setFormState] = useState<any | null>(null);
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();
	const [roleLoadingState, role] = useSiteRole();

	useEffect(() => {
		if (role) {
			setFormState({
				name: role.attributes.displayName,
				description: role.description,
			});
		}
	}, [role]);

	useEffect(() => {
		if (roleLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [roleLoadingState, rolesLoadingStates.isUpdatingSiteRole]);

	useEffect(() => {
		if (siteId && roleId) {
			rolesFacade.getSiteRole(siteId, roleId);
			return;
		}
	}, [roleId, siteId]);

	/**
	 * Methods
	 */
	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId && roleId) {
			rolesFacade
				.updateSiteRole({
					siteId,
					roleId,
					body: request,
				})
				.then(() => console.log('navigate to overview'));
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
				loading={rolesLoadingStates.isUpdatingSiteRole === LoadingState.Loading}
				onCancel={() => console.log('cancel')}
				onSubmit={onSubmit}
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
