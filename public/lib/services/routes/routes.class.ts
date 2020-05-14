import Core, { ModuleRouteConfig } from '@redactie/redactie-core';

/**
 * Helper function to prefix all routes with /users
 * @param routeConfig single route of type ModuleRouteConfig, may include subroutes
 */
const prefixRoute = (routeConfig: ModuleRouteConfig): ModuleRouteConfig => ({
	...routeConfig,
	path: `/users${routeConfig.path}`,
	routes: routeConfig.routes?.map(prefixRoute),
	navigation: routeConfig.navigation
		? {
				...routeConfig.navigation,
				parentPath: routeConfig.navigation.parentPath
					? `/users${routeConfig.navigation.parentPath}`
					: undefined,
		  }
		: undefined,
});

class Routes {
	private registeredRoutes: ModuleRouteConfig[] = [];

	register(routeConfig: ModuleRouteConfig | ModuleRouteConfig[]): void {
		const configs = Array.isArray(routeConfig) ? routeConfig : [routeConfig];
		this.registeredRoutes = [
			...configs.map(config => prefixRoute(config)),
			...this.registeredRoutes,
		];

		Core.routes.updateChildRoutes('/users', this.registeredRoutes);
	}

	getAll(): ModuleRouteConfig[] {
		return this.registeredRoutes;
	}
}

export const routes = new Routes();

export default Routes;
