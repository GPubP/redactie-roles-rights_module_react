import { QueryEntity } from '@datorama/akita';

import { SitesState } from './sites.model';
import { SitesStore, sitesStore } from './sites.store';

export class SitesQuery extends QueryEntity<SitesState> {
	constructor(protected store: SitesStore) {
		super(store);
	}

	public meta$ = this.select(state => state.meta);
	public sites$ = this.select(state => state.sites);
	public isFetching$ = this.select(state => state.isFetching);
}

export const sitesQuery = new SitesQuery(sitesStore);
