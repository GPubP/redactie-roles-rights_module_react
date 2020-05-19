import { EntityState } from '@datorama/akita';

import { ModuleResponse, RoleResponse, SecurityRightResponse } from '../../services/securityRights';

export type RoleModel = RoleResponse;
export type SecurityRightModel = SecurityRightResponse;
export type ModuleModel = ModuleResponse;

export interface SecurityRightsState extends EntityState<RoleResponse, string> {
	securityRight?: SecurityRightModel;
	role?: RoleModel;
	module?: ModuleModel;
	isFetching: boolean;
}

export const createInitialSecurityRightsState = (): SecurityRightsState => ({
	isFetching: false,
});
