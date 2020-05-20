import { RoleResponse, SecurityRightResponse } from '../../services/securityRights';

export interface RolesPermissionsProps {
	roles: RoleResponse[] | null | undefined;
	permissions: SecurityRightResponse[] | null | undefined;
}
