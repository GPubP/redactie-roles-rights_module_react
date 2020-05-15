import { Breadcrumb, ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { ReactNode } from 'react';

import { useNavigate } from '../../hooks';
import { BREADCRUMB_OPTIONS, MODULE_PATHS } from '../../roles.const';
import useRoutes from '../useRoutes/useRoutes';

const useRoutesBreadcrumbs = (extraBreadcrumbs: Breadcrumb[] = []): ReactNode => {
	const { generatePath } = useNavigate();
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraBreadcrumbs: [
			{
				name: 'Home',
				target: generatePath(MODULE_PATHS.dashboard),
			},
			{
				name: 'Gebruikers',
				target: '',
			},
			...extraBreadcrumbs,
		],
	});

	return breadcrumbs;
};

export default useRoutesBreadcrumbs;