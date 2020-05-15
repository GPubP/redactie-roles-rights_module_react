import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { Routes } from '@redactie/redactie-core/dist/routes';

// TODO export sites api typings
const RolesAPI: { routes: Routes } = Core.modules.getModuleAPI('roles-rights-module') as {
	routes: Routes;
};

export const registerRoutes = (routes: ModuleRouteConfig): any | false =>
	RolesAPI ? RolesAPI.routes.register(routes) : false;
