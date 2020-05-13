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
}

export interface SitesMetaResponse {
	size: string;
	totalElements: number;
	totalPages: number;
	number: string;
}
