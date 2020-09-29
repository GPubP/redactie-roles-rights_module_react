import { FormikProps } from 'formik';

import { RoleResponse } from '../../../services/securityRights';
import { RoleSecurityRight } from '../../../views/RolesRightsOverview/RolesRightsOverview.types';

export interface RolesPermissionsFormProps {
	roles: RoleResponse[];
	permissions: RoleSecurityRight[];
	mySecurityRights: string[];
	title: string;
	initialFormState: RolesPermissionsFormState;
	readonly: boolean;
	isChanged?: boolean;
	isLoading?: boolean;
	onChange?: (values: RolesPermissionsFormState) => void;
	onSubmit?: (values: RolesPermissionsFormState) => void;
	onCancel?: (resetForm: FormikProps<RolesPermissionsFormState>['resetForm']) => void;
}

export interface RolesPermissionsFormState {
	[key: string]: string[];
}
