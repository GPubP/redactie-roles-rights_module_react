import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { useNavigate, useRolesLoadingStates, useRoutesBreadcrumbs } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesCreate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams<{ siteId: string }>();
	const { navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();

	/**
	 * Methods
	 */
	const generateRoleDetailFormState = (): RoleDetailFormState => ({
		name: '',
		description: '',
	});

	const navigateToOverview = (): void => {
		navigate(`/sites${MODULE_PATHS.roles.overview}`, { siteId });
	};

	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId) {
			rolesFacade
				.createSiteRole({
					siteId,
					body: request,
				})
				.then(navigateToOverview);
		}
	};

	/**
	 * Render
	 */
	return (
		<>
			<ContextHeader title="Rol aanmaken">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<RoleDetailForm
					initialState={generateRoleDetailFormState()}
					isLoading={rolesLoadingStates.isCreatingSiteRole === LoadingState.Loading}
					onCancel={navigateToOverview}
					onSubmit={onSubmit}
				/>
			</Container>
		</>
	);
};

export default RolesCreate;
