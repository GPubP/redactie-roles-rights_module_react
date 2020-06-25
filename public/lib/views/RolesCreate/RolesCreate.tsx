import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { useRolesLoadingStates, useRoutesBreadcrumbs } from '../../hooks';
import { LoadingState, RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesCreate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams();
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();

	/**
	 * Methods
	 */
	const generateRoleDetailFormState = (): RoleDetailFormState => ({
		name: '',
		description: '',
	});

	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId) {
			rolesFacade
				.createSiteRole({
					siteId,
					body: request,
				})
				.then(() => console.log('navigate to overview'));
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
					loading={rolesLoadingStates.isCreatingSiteRole === LoadingState.Loading}
					onCancel={() => console.log('cancel')}
					onSubmit={onSubmit}
				/>
			</Container>
		</>
	);
};

export default RolesCreate;
