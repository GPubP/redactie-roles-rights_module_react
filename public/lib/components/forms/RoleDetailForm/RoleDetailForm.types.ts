import { RoleDetailFormState } from '../../../roles.types';

export interface RoleDetailFormProps {
	initialState: RoleDetailFormState;
	isLoading?: boolean;
	isDeleting?: boolean;
	onCancel: () => void;
	onSubmit: (values: RoleDetailFormState) => void;
	onDelete?: false | (() => void);
}
