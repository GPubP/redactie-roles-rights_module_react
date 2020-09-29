import { FormikProps } from 'formik';

import { RoleDetailFormState } from '../../../roles.types';

export interface RoleDetailFormProps {
	initialState: RoleDetailFormState;
	isLoading?: boolean;
	isDeleting?: boolean;
	isChanged?: boolean;
	onCancel?: (resetForm: FormikProps<RoleDetailFormState>['resetForm']) => void;
	onSubmit?: (values: RoleDetailFormState) => void;
	onChange?: (values: RoleDetailFormState) => void;
	onDelete?: false | (() => void);
}
