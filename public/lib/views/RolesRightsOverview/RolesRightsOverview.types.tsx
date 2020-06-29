import { SecurityRightResponse } from '../../services/securityRights';

export interface RoleSecurityRight {
	id: string;
	name: string;
	type: string;
	securityRights: SecurityRightResponse[];
}

export interface MatrixTitle {
	id: string;
}
