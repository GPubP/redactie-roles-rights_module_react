import Core from '@redactie/redactie-core';

import { RolesRightsModuleAPI } from '../roles.types';

import { components } from './components';
import { guards } from './guards';
import { hooks } from './hooks';
import { store } from './store';

export const registerRolesAPI = (): void => {
	const api: RolesRightsModuleAPI = {
		store,
		hooks,
		components,
		guards,
	};

	Core.modules.exposeModuleApi('roles-rights-module', api);
};
