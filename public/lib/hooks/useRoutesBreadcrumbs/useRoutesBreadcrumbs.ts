import { Breadcrumb, ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { useNavigate, useRoutes, useSiteContext } from '@redactie/utils';
import { ReactNode } from 'react';

import { BREADCRUMB_OPTIONS, MODULE_PATHS, SITES_ROOT } from '../../roles.const';

const useRoutesBreadcrumbs = (
	extraBreadcrumbs: Breadcrumb[] = [],
	isSiteLevel = false
): ReactNode => {
	const { generatePath } = useNavigate(isSiteLevel ? SITES_ROOT : undefined);
	const { siteId } = useSiteContext();
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraBreadcrumbs: [
			{
				name: 'Home',
				target: generatePath(
					isSiteLevel ? MODULE_PATHS.dashboard : MODULE_PATHS.dashboardRoot,
					{
						siteId,
					}
				),
			},
			...extraBreadcrumbs,
		],
	});

	return breadcrumbs;
};

export default useRoutesBreadcrumbs;
