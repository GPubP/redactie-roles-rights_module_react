import { EmbeddedResponse } from '../../roles.types';
import { SearchParams } from '../api';

export type GetRolesPayload = SearchParams;

export interface RoleAttributes {
	displayName?: string;
	level?: string;
	[key: string]: any;
	CRUD: string | null;
	DOMEIN: string | null;
	LOCATIE: string | null;
	STADSBEDRIJF: string | null;
}

export interface RoleResponse {
	attributes: RoleAttributes;
	description: string;
	id: string;
	name: string;
	validFrom: Date | null;
	validTo: Date | null;
}

export type RolesResponse = EmbeddedResponse<RoleResponse>;
