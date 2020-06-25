//TODO: replace any with RoleDetailFormState

export interface RoleDetailFormProps {
	initialState: any;
	loading?: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
}
