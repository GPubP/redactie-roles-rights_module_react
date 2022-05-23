import { securityRightsSiteCanShown, securityRightsTenantCanShown } from '../canShowns';

import { RolesRightsModuleCanShowsAPI } from './api.types';

export const canShowns: RolesRightsModuleCanShowsAPI = {
	securityRightsTenantCanShown,
	securityRightsSiteCanShown,
};
