import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialSitesState, SiteModel, SitesState } from './sites.model';

@StoreConfig({ name: 'sites', idKey: 'uuid' })
export class SitesStore extends EntityStore<SitesState, SiteModel> {
	constructor() {
		super(createInitialSitesState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}
}

export const sitesStore = new SitesStore();
