import { filterNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged } from 'rxjs/operators';

import { SitesState } from './sites.model';
import { SitesStore, sitesStore } from './sites.store';

export class SitesQuery extends BaseEntityQuery<SitesState> {
	constructor(protected store: SitesStore) {
		super(store);
	}

	// Data
	public sites$ = this.selectAll();
	public site$ = this.select(state => state.site).pipe(filterNil, distinctUntilChanged());
}

export const sitesQuery = new SitesQuery(sitesStore);
