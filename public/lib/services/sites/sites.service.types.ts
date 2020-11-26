import { EmbeddedResponse } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { SearchParams } from '../api';

export type SitesResponse = EmbeddedResponse<SiteResponse>;

export interface SiteResponse {
	uuid: string;
	data: {
		name: string;
		description: string;
		contentTypes: string[];
	};
	meta: {
		tenant: string;
		createdAt: string;
		updatedAt: string;
		active: boolean;
	};
	roles: RoleModel[];
	hasAccess: boolean;
}

export interface GetSitePayload {
	id: string;
}

export type GetSitesPayload = SearchParams & { userUuid: string };

export interface SitesMeta {
	size: string;
	totalElements: number;
	totalPages: number;
	number: string;
}

export interface SitesData {
	meta: SitesMeta;
	data: SiteResponse[];
}
