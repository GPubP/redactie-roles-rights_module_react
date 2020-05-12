export interface FormViewUserRolesProps {
	formState: any;
	onSubmit: (formValues: any) => void;
}

export interface Role {
	name: string;
	checked: boolean;
}
