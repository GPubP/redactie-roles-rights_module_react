import { FormikProps } from 'formik';

import { RoleModel } from '../../../store/roles';

export interface FormViewUserRolesProps {
	checkAdmin?: boolean;
	readonly?: boolean;
	initialState: UserRolesFormState;
	availableRoles: RoleModel[];
	children?: (props: FormikProps<UserRolesFormState>) => React.ReactNode;
	formikRef?: (ref: any) => void;
	onSubmit?: (values: UserRolesFormState) => void;
	onChange?: (values: UserRolesFormState) => void;
}

export interface UserRolesFormState {
	roleIds: string[];
}
