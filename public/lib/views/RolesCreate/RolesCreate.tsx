import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { LeavePrompt, useDetectValueChanges } from '@redactie/utils';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoleDetailForm } from '../../components';
import { useNavigate, useRolesLoadingStates, useRoutesBreadcrumbs } from '../../hooks';
import { MODULE_PATHS, TENANT_ROOT } from '../../roles.const';
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
	const [hasChanges] = useDetectValueChanges(true, formValue);
	const [allowedPaths, setAllowedPaths] = useState<string[]>([]);

	/**
	 * Methods
	 */

	const navigateToOverview = (): void => {
		navigate(`/sites${MODULE_PATHS.roles.overview}`, { siteId });
	};

	const onSubmit = (request: RoleDetailFormState): void => {
		if (siteId) {
			setAllowedPaths([`${TENANT_ROOT}/sites${MODULE_PATHS.roles.overview}`]);
			rolesFacade
				.createSiteRole({
					siteId,
					body: request,
				})
				.then(navigateToOverview)
				.finally(() => setAllowedPaths([]));
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
					hasChanges={hasChanges}
					onCancel={navigateToOverview}
					onSubmit={onSubmit}
					onChange={setFormValue}
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
			</Container>
		</>
	);
};

export default RolesCreate;
