import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import React, { FC } from 'react';

import { ModulesList, RolesPermissionsList } from '../../components';
import { RolesRouteProps } from '../../roles.types';

const RolesOverview: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */

	/**
	 * Methods
	 */

	/**
	 * Render
	 */
	return (
		<>
			<ContextHeader title="Rollen en rechten">
				<ContextHeaderTopSection>breadcrumbs</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="row">
					<ModulesList />
					<RolesPermissionsList />
				</div>
			</Container>
		</>
	);
};

export default RolesOverview;
