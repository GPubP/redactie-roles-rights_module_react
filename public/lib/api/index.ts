import Core from '@redactie/redactie-core';

import * as API from './api';

export const registerRolesAPI = (): void => {
	Core.modules.exposeModuleApi('roles-rights-module', API);
};

export { API };
