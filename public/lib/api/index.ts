import Core from '@redactie/redactie-core';

import { RolesRightsModuleAPI } from '../roles.types';

import { canShowns } from './canShowns';
import { components } from './components';
import { consts } from './consts';
import { guards } from './guards';
import { helpers } from './helpers';
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
		helpers,
		consts,
	};

	Core.modules.exposeModuleApi('roles-rights-module', api);
};
