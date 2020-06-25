import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader } from '../../components';
import { useRoutesBreadcrumbs, useSiteRole } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';

const RolesUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const { siteId, roleId } = useParams();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [formState, setFormState] = useState<any | null>(null);
	const breadcrumbs = useRoutesBreadcrumbs();
	const [roleLoadingState, role] = useSiteRole();

	useEffect(() => {
		if (role) {
			setFormState({
				name: role.name,
			});
		}
	}, [role]);

	useEffect(() => {
		if (roleLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [roleLoadingState]);

	useEffect(() => {
		if (siteId && roleId) {
			rolesFacade.getSiteRole(siteId, roleId);
			return;
		}
	}, [roleId, siteId]);

	/**
	 * Methods
	 */

	/**
	 * Render
	 */
	const renderRoleUpdate = (): ReactElement | null => {
		if (!formState) {
			return null;
		}

		return <div>form</div>;
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
