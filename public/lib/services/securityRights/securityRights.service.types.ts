import { SearchParams } from '../api';

export interface SecurityRightMatrixResponse {
	modules: ModuleResponse[];
	securityRights: SecurityRightResponse[];
	roles: RoleResponse[];
}

export interface SecurityRightAttributes {
	identifier: string;
	key: string;
	level: string;
	module: string;
	moduleVersion: string;
	type: string;
	displayName: string;
}
export interface SecurityRightResponse {
	applicationDisplayName: string;
	applicationId: string;
	applicationName: string;
	attributes: SecurityRightAttributes;
	description: string;
	environment: string;
	id: string;
	name: string;
	neededTrustLevel: number;
}

export interface ModuleResponse {
	id: string;
	name: string;
}

export interface RoleAttributes {
	displayName?: string;
	level?: string;
	[key: string]: any;
	CRUD: string | null;
	DOMEIN: string | null;
	LOCATIE: string | null;
	STADSBEDRIJF: string | null;
}

export interface Role {
	attributes: RoleAttributes;
	description: string;
	id: string;
	name: string;
	validFrom: Date | null;
	validTo: Date | null;
}

export interface RoleResponse {
	role: Role;
	securityRights: string[];
}

export interface GetSecurityRightPayload {
	id: string;
}

export type GetSecurityRightsPayload = SearchParams;

export interface UpdateRolesMatrix {
	roleId: string;
	securityRights: string[];
}

export type UpdateRolesMatrixPayload = UpdateRolesMatrix[];
