import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { equals } from 'ramda';
import React, { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { useNavigate, useRolesLoadingStates, useRoutesBreadcrumbs } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RoleDetailFormState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

import { INITIAL_FORM_STATE } from './RolesCreate.const';

const RolesCreate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId } = useParams<{ siteId: string }>();
	const { navigate } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs();
	const rolesLoadingStates = useRolesLoadingStates();
	const [formValue, setFormValue] = useState<RoleDetailFormState>(INITIAL_FORM_STATE);
	const isChanged = useMemo(() => !equals(INITIAL_FORM_STATE, formValue), [formValue]);

	/**
	 * Methods
	 */

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
					initialState={INITIAL_FORM_STATE}
					isLoading={rolesLoadingStates.isCreatingSiteRole === LoadingState.Loading}
					isChanged={isChanged}
					onCancel={navigateToOverview}
					onSubmit={onSubmit}
					onChange={setFormValue}
				/>
			</Container>
		</>
	);
};

export default RolesCreate;
