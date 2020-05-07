import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import React, { FC } from 'react';

import { useRoutesBreadcrumbs } from '../../hooks';
import { RolesRouteProps } from '../../roles.types';

const UserUpdate: FC<RolesRouteProps> = () => {
	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();

	/**
	 * Render
	 */
	return (
		<>
			<ContextHeader title="Voornaam Achternaam">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<div className="u-margin-top">Hello</div>
		</>
	);
};

export default UserUpdate;
