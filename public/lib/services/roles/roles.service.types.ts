import { SearchParams } from '../api';

export interface SecurityRightsResponse {
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

export interface RoleAttributes {
	displayName: string;
	level: string;
	[key: string]: any;
	CRUD: string | null;
	DOMEIN: string | null;
	LOCATIE: string | null;
	STADSBEDRIJF: string | null;
}

export interface Role {
	role: RoleResponse;
	securityRights: string[];
}

export interface GetSecurityRightPayload {
	id: string;
}

export type GetSecurityRightsPayload = SearchParams;

export interface RoleResponse {
	attributes: RoleAttributes;
	description: string;
	id: string;
	name: string;
	validFrom: Date | null;
	validTo: Date | null;
}

export interface RolesMetaResponse {
	size: number;
	totalElements: boolean;
	totalPages: number;
	number: number;
}

export interface RolesResponse {
	_embedded: RoleResponse[];
	_page: RolesMetaResponse;
}
