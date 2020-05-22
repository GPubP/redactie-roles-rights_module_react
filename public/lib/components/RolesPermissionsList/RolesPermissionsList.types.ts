import { RoleResponse } from '../../services/securityRights';
import { RoleSecurityRight } from '../../views/RolesOverview/RolesOverview.types';

export interface RolesPermissionsProps {
	roles: RoleResponse[];
	permissions: RoleSecurityRight[];
	formState: FormState;
	onChange: (formValues: FormState) => void;
}

export interface FormState {
	[key: string]: string[];
}
