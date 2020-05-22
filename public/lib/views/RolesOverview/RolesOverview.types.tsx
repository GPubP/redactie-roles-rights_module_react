import { SecurityRightResponse } from '../../services/securityRights';

export interface RoleSecurityRight {
	id: string;
	name: string;
	securityRights: SecurityRightResponse[];
}
