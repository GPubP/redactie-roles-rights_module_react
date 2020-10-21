import { MODULE_PATHS, TENANT_ROOT } from '../../roles.const';

export const USER_UPDATE_NAV_LIST_ITEMS = [
	{ key: 'general', label: 'Algemeen', to: 'algemeen' },
	{ key: 'roles', label: 'Rollen', to: 'rollen' },
];

export const USER_UPDATE_ALLOWED_PATHS = [
	`${TENANT_ROOT}${MODULE_PATHS.tenantUserDetailGeneral}`,
	`${TENANT_ROOT}${MODULE_PATHS.tenantUserDetailRoles}`,
];
