import Core from '@redactie/redactie-core';

import { store } from './store';

export const registerRolesAPI = (): void =>
	Core.modules.exposeModuleApi('roles-rights-module', {
		store,
	});
