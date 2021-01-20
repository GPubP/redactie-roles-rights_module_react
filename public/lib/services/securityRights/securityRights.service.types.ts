import { SearchParams } from '@redactie/utils';

export interface SecurityRightMatrixResponse {
	modules: ModuleResponse[];
	securityRights: SecurityRightResponse[];
	roles: RoleResponse[];
	contentTypes: ModuleResponse[];
}

export interface SecurityRightAttributes {
	identifier: string;
	key: string;
	level: string;
	module: string;
	subModule: string;
	moduleVersion: string;
	type: 'module' | 'content-type';
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
	type?: 'module' | 'content-type';
}

export interface RoleAttributes {
	displayName?: string;
	level?: string;
	admin?: boolean;
	[key: string]: any;
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
