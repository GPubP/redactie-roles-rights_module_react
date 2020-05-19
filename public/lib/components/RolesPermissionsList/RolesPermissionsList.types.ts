import { Role, SecurityRightResponse } from '../../services/roles';

export interface RolesPermissionsProps {
	roles: Role[];
	permissions: SecurityRightResponse[];
}
