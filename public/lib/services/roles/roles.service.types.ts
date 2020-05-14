import { SearchParams } from '../api';

export interface RolesResponse {
	modules: ModuleResponse[];
	securityRights: SecurityRightResponse[];
	roles: RoleResponse[];
}

export interface SecurityRightAtrributes {
	level: string;
	module: string;
	site: string;
	tenant: string;
	type: string;
}
export interface SecurityRightResponse {
	applicationDisplayName: string;
	applicationId: string;
	applicationName: string;
	attributes: SecurityRightAtrributes;
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

export interface RoleAtrributes {
	CRUD: string;
	DOMEIN: string;
	LOCATIE: string;
	STADSBEDRIJF: string;
}

export interface Role {
	attributes: RoleAtrributes;
	description: string;
	id: string;
	name: string;
	validFrom: string;
	validTo: string;
}

export interface RoleResponse {
	role: Role;
	securityRights: string[];
}

export interface GetRolePayload {
	id: string;
}

export type GetRolesPayload = SearchParams;
