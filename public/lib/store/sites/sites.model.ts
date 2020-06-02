import { EntityState } from '@datorama/akita';

import { Page } from '../../roles.types';
import { RoleResponse } from '../../services/roles';
import { SiteResponse } from '../../services/sites';

export interface SiteModel extends SiteResponse {
	hasAccess: boolean;
	roles: RoleResponse[];
}
export type SiteDetail = SiteResponse;
export type SitesMetaModel = Page;

export interface SitesState extends EntityState<SiteModel, string> {
	meta?: SitesMetaModel;
	site?: SiteDetail;
	isFetching: boolean;
}

export const createInitialSitesState = (): SitesState => ({
	isFetching: false,
});
