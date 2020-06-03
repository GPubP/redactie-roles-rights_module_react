import { RoleModel } from '../../../store/roles';

export interface FormViewUserRolesProps {
	formState: Array<string>;
	availableRoles: RoleModel[];
	readonly: boolean;
	onSubmit: (formValues: Array<string>) => void;
}

export interface RoleIds {
	roleIds: Array<string>;
}
