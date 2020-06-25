import { RoleDetailFormState } from '../../../roles.types';

export interface RoleDetailFormProps {
	initialState: RoleDetailFormState;
	loading?: boolean;
	onCancel: () => void;
	onSubmit: (values: RoleDetailFormState) => void;
}
