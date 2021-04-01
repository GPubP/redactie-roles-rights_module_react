import { FormikProps } from 'formik';

import { Role } from '../../../services/securityRights';
import { RoleSecurityRight } from '../../../views/RolesRightsOverview/RolesRightsOverview.types';

export interface RolesPermissionsFormProps {
	roles: Role[];
	permissions: RoleSecurityRight[];
	mySecurityRights: string[];
	title: string;
	initialFormState: RolesPermissionsFormState;
	readonly: boolean;
	hasChanges?: boolean;
	isLoading?: boolean;
	onChange?: (values: RolesPermissionsFormState) => void;
	onSubmit?: (values: RolesPermissionsFormState) => void;
	onCancel?: (resetForm: FormikProps<RolesPermissionsFormState>['resetForm']) => void;
}

export interface RolesPermissionsFormState {
	[key: string]: string[];
}
