export interface FormViewUserRolesProps {
	formState: Array<string>;
	availableRoles: Role[];
	onSubmit: (formValues: RoleIds) => void;
}

export interface Role {
	id: string;
	name: string;
}

export interface RoleIds {
	roleIds: Array<string>;
}
