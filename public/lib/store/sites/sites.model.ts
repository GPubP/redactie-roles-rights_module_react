import { EntityState } from '@datorama/akita';

import { RoleResponse } from '../../services/roles';
import { SiteResponse, SitesMetaResponse } from '../../services/sites';

export interface SiteModel extends SiteResponse {
	hasAccess: boolean;
	roles: RoleResponse[];
}
export type SitesMetaModel = SitesMetaResponse;

export interface SitesState extends EntityState<SiteModel, string> {
	meta?: SitesMetaModel;
	sites?: SiteModel[];
	isFetching: boolean;
}

export const createInitialSitesState = (): SitesState => ({
	isFetching: false,
});
