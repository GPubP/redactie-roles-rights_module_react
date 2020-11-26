import { PaginationResponse } from '@datorama/akita';
import { usePrevious } from '@redactie/utils';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { first } from 'rxjs/operators';

import { SearchParams } from '../../services/api';
import { SiteResponse } from '../../services/sites';
import { sitesFacade, sitesPaginator } from '../../store/sites';

function useSitesPagination(
	sitesSearchParams: SearchParams,
	userUuid: string,
	clearCache = false
): PaginationResponse<SiteResponse> | null {
	const [pagination, setPagination] = useState<PaginationResponse<SiteResponse> | null>(null);
	const prevSitesSearchParams = usePrevious<SearchParams>(sitesSearchParams);

	useEffect(() => {
		if (equals(sitesSearchParams, prevSitesSearchParams)) {
			return;
		}

		if (
			sitesSearchParams.sort !== prevSitesSearchParams?.sort ||
			sitesSearchParams.search !== prevSitesSearchParams?.search ||
			clearCache
		) {
			sitesPaginator.clearCache();
		}

		sitesPaginator.setPage(sitesSearchParams.page as number);

		sitesPaginator
			.getPage(() => sitesFacade.getSitesPaginated({
				...sitesSearchParams,
				userUuid
			}))
			.pipe(first())
			.subscribe(result => {
				if (result) {
					setPagination(result);
				}
			});
	}, [sitesSearchParams, prevSitesSearchParams, clearCache]);

	return pagination;
}
export default useSitesPagination;
