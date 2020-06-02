import Core from '@redactie/redactie-core';

import { RolesRightsModuleAPI } from '../roles.types';

import { canShowns } from './canShowns';
import { components } from './components';
import { guards } from './guards';
import { hooks } from './hooks';
import { store } from './store';
import { views } from './views';

export const registerRolesAPI = (): void => {
	const api: RolesRightsModuleAPI = {
		store,
		hooks,
		components,
		guards,
		views,
		canShowns,
	};

	Core.modules.exposeModuleApi('roles-rights-module', api);
};
