import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { SiteModel, SitesState } from './sites.model';

@StoreConfig({ name: 'sites', idKey: 'uuid' })
export class SitesStore extends BaseEntityStore<SitesState, SiteModel> {}

export const sitesStore = new SitesStore();
