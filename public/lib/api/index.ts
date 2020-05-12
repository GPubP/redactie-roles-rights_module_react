import Core from '@redactie/redactie-core';

import { routes } from '../services/routes/routes.class';

import { store } from './store';

export const registerRolesAPI = (): void =>
	Core.modules.exposeModuleApi('roles-rights-module', {
		routes,
		store,
	});
