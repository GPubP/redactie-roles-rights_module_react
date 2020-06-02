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
export interface SecurityRightsMatrixState {
	data: SecurityRightMatrixModel | null;
	isFetching: boolean;
	isUpdating: boolean;
}

export const createInitialSecurityRightsMatrixState = (): SecurityRightsMatrixState => ({
	data: null,
	isFetching: false,
	isUpdating: false,
});
