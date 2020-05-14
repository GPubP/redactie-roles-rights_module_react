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
					<ModulesList
						modules={[
							{ id: 1, name: 'module 1' },
							{ id: 2, name: 'module 2' },
						]}
					/>
					<RolesPermissionsList
						roles={[
							{ id: 1, name: 'rol 1' },
							{ id: 2, name: 'rol 2' },
						]}
						permissions={[
							{ id: 1, name: 'permissie 1' },
							{ id: 2, name: 'permissie 2' },
						]}
					/>
				</div>
			</Container>
		</>
	);
};

export default RolesOverview;
