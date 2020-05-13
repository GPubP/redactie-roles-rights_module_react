import { RoleModel } from '../../../store/roles';

export interface FormViewUserRolesProps {
	formState: Array<string>;
	availableRoles: RoleModel[];
	onSubmit: (formValues: RoleIds) => void;
}

export interface RoleIds {
	roleIds: Array<string>;
}
