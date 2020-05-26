import { EmbeddedResponse } from '../../roles.types';
import { RoleModel } from '../../store/roles';

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
}

export interface GetSitePayload {
	id: string;
}

export interface GetSitesPayload {
	id: string;
}
