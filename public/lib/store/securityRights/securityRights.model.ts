import {
	ModuleResponse,
	RoleResponse,
	SecurityRightMatrixResponse,
	SecurityRightResponse,
} from '../../services/securityRights';

export type SecurityRightMatrixModel = SecurityRightMatrixResponse;
export type ModuleModel = ModuleResponse;
export type SecurityRightModel = SecurityRightResponse;
export type RoleModel = RoleResponse;
export interface SecurityRightsState {
	data: SecurityRightMatrixModel | null;
	isFetching: boolean;
}

export const createInitialSecurityRightsState = (): SecurityRightsState => ({
	data: null,
	isFetching: false,
});
