import {
	useMySecurityRightsForSite,
	useMySecurityRightsForTenant,
	useSiteRoles,
	useUserRolesForSite,
	useUsers,
} from '../hooks';

import { RolesRightsModuleHooksAPI } from './api.types';

export const hooks: RolesRightsModuleHooksAPI = {
	useMySecurityRightsForSite,
	useMySecurityRightsForTenant,
	useUsers,
	useSiteRoles,
	useUserRolesForSite,
};
