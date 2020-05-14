import { EntityState } from '@datorama/akita';

import { ModuleResponse, RoleResponse, SecurityRightResponse } from '../../services/roles';

export type RoleModel = RoleResponse;
export type SecurityRightModel = SecurityRightResponse;
export type ModuleModel = ModuleResponse;

export interface RolesState extends EntityState<RoleModel, string> {
	securityRight?: SecurityRightModel;
	role?: RoleModel;
	module?: ModuleModel;
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	loading: false,
	isFetching: false,
});
