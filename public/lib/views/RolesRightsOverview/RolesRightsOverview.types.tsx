import { RolesRightsCompartmentType } from '../../roles.types';
import { SecurityRightResponse } from '../../services/securityRights';

export interface RoleSecurityRight {
	id: string;
	name: string;
	type: string;
	securityRights: SecurityRightResponse[];
}

export interface MatrixTitle {
	id: string;
}

export interface SelectedCompartment {
	type: RolesRightsCompartmentType;
	id: string;
}

export interface RolesRightsQueryParams {
	'content-type'?: string | null | undefined;
	module?: string | null | undefined;
}
