import { EntityState } from '@datorama/akita';

import { SitesMetaResponse } from '../../services/sites';

export type SiteModel = any;
export type SitesMetaModel = SitesMetaResponse;

export interface SitesState extends EntityState<SiteModel, string> {
	meta?: SitesMetaModel;
	sites?: SiteModel[];
	isFetching: boolean;
}

export const createInitialSitesState = (): SitesState => ({
	loading: false,
	isFetching: false,
});
