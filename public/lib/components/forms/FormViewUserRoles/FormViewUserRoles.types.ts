import { FormikProps } from 'formik';

import { RoleModel } from '../../../store/roles';

export interface FormViewUserRolesProps {
	checkAdmin?: boolean;
	initialState: UserRolesFormState;
	availableRoles: RoleModel[];
	isLoading?: boolean;
	isChanged?: boolean;
	showActionBar?: boolean;
	formikRef?: (ref: any) => void;
	onCancel?: (resetForm: FormikProps<UserRolesFormState>['resetForm']) => void;
	onSubmit?: (values: UserRolesFormState) => void;
	onChange?: (values: UserRolesFormState) => void;
}

export interface UserRolesFormState {
	roleIds: string[];
}
