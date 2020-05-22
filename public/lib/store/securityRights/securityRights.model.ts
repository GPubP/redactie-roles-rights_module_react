import { SecurityRightMatrixResponse } from '../../services/securityRights';

export type SecurityRightMatrixModel = SecurityRightMatrixResponse;

export interface SecurityRightsState {
	data: SecurityRightMatrixModel | null;
	isFetching: boolean;
}

export const createInitialSecurityRightsState = (): SecurityRightsState => ({
	data: null,
	isFetching: false,
});
