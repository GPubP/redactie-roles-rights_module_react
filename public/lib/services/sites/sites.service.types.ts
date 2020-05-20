import { RoleModel } from '../../store/roles';

export interface SitesResponse {
	_embedded: SiteResponse[];
	_page: SitesMetaResponse;
}

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
}

export interface SitesMetaResponse {
	size: string;
	totalElements: number;
	totalPages: number;
	number: string;
}

export interface GetSitePayload {
	id: string;
}

export interface GetSitesPayload {
	id: string;
}
