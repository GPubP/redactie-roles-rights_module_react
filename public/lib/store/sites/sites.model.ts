import { BaseEntityState } from '@redactie/utils';

import { Page } from '../../roles.types';
import { RoleResponse } from '../../services/roles';
import { SiteResponse } from '../../services/sites';

export interface SiteModel extends SiteResponse {
	hasAccess: boolean;
	roles: RoleResponse[];
}
export type SiteDetail = SiteResponse;
export type SitesMetaModel = Page;

export interface SitesState extends BaseEntityState<SiteModel, string> {
	meta?: SitesMetaModel;
	site?: SiteDetail;
}
