import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { UserRolesFormState } from '../../components';
import { RoleModel } from '../../store/roles';
import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
	userRoles: RoleModel[];
	roles: RoleModel[];
	mySecurityRights: string[];
	formikRef?: (ref: any) => void;
	onChange: (value: UserRolesFormState) => void;
}

export interface SiteRow {
	siteUuid: string;
	name: string;
	roles: any[];
	hasAccess: boolean;
	editAccess: () => void;
	giveAccess: () => void;
}
