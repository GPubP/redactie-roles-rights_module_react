export interface RoleAttributes {
	displayName: string;
	level: string;
	[key: string]: any;
}

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
