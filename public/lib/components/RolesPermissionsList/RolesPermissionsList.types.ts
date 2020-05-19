import { RoleResponse, SecurityRightResponse } from '../../services/securityRights';

export interface RolesPermissionsProps {
	roles: RoleResponse[];
	permissions: SecurityRightResponse[];
}
