import { securityRightsSiteGuard, securityRightsTenantGuard } from '../guards';

import { RolesRightsModuleGuardsAPI } from './api.types';

export const guards: RolesRightsModuleGuardsAPI = {
	securityRightsTenantGuard,
	securityRightsSiteGuard,
};
