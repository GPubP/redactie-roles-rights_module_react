import { RoleResponse } from '../../services/securityRights';
import { RoleSecurityRight } from '../../views/RolesOverview/RolesOverview.types';

export interface FormState {
	permissionId: string;
	roleIds: Array<string>;
}
export interface RolesPermissionsProps {
	roles: RoleResponse[];
	permissions: RoleSecurityRight[];
	formState: FormState[];
	//onSubmit: (formValues: SecurityRightRole[]) => void;
}

// export interface SecurityRightRole {
// 	securityRightId: string;
// 	rolesIds: Array<string>;
// }
