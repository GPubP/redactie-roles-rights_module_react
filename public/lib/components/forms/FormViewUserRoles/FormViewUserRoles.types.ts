import { RoleModel } from '../../../store/roles';

export interface FormViewUserRolesProps {
	checkAdmin?: boolean;
	formState: Array<string>;
	availableRoles: RoleModel[];
	onSubmit: (formValues: Array<string>) => void;
}

export interface RoleIds {
	roleIds: Array<string>;
}
