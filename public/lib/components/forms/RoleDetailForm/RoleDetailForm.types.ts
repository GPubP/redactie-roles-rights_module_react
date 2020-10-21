import { FormikProps } from 'formik';

import { RoleDetailFormState } from '../../../roles.types';

export interface RoleDetailFormProps {
	initialState: RoleDetailFormState;
	isLoading?: boolean;
	isDeleting?: boolean;
	hasChanges?: boolean;
	onCancel?: (resetForm: FormikProps<RoleDetailFormState>['resetForm']) => void;
	onSubmit?: (values: RoleDetailFormState) => void;
	onChange?: (values: RoleDetailFormState) => void;
	children?: (props: FormikProps<RoleDetailFormState>) => React.ReactNode;
	onDelete?: false | (() => void);
}
