import { RoleResponse } from '../../services/securityRights';
import { RoleSecurityRight } from '../../views/RolesRightsOverview/RolesRightsOverview.types';

export interface RolesPermissionsProps {
	readonly: boolean;
	roles: RoleResponse[];
	permissions: RoleSecurityRight[];
	formState: FormState;
	onChange: (formValues: FormState) => void;
	title: string;
}

export interface FormState {
	[key: string]: string[];
}
