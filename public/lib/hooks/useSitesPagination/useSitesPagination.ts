import { PaginationResponse } from '@datorama/akita';
import { SearchParams, usePrevious } from '@redactie/utils';
import { equals } from 'ramda';
import { useCallback, useEffect, useState } from 'react';

import { sitesConnector } from '../../connectors';
import { RoleMapsResponses } from '../../services/roles';
import { usersApiService } from '../../services/users';

import { SiteModelWithRoles } from './useSitesPagination.types';

function useSitesPagination(
	sitesSearchParams: SearchParams,
	userUuid: string,
	clearCache = false
): [PaginationResponse<SiteModelWithRoles> | null, boolean] {
	const [newPagination, setNewPagination] = useState<PaginationResponse<
		SiteModelWithRoles
	> | null>(null);
	const prevUserUuid = usePrevious<string>(userUuid);
	const [pagination] = sitesConnector.hooks.useSitesPagination(
		sitesSearchParams as any,
		clearCache
	);
	const [siteRolesMap, setSiteRolesMap] = useState<RoleMapsResponses>();
	const [prevSiteUuids, setPrevSiteUuids] = useState<string[]>([]);
	const [isFetchingRolesForSite, setIsFetchingRolesForSite] = useState(false);

	const fetchUserRolesForSite = useCallback(async () => {
		const uuids = (pagination?.data || []).map(site => site.uuid);

		if ((userUuid === prevUserUuid && equals(uuids, prevSiteUuids)) || uuids.length === 0) {
			return;
		}

		setPrevSiteUuids(uuids);
		setIsFetchingRolesForSite(true);
		const result = await usersApiService.searchUserRolesForSite({
			userUuid: userUuid,
			siteUuids: uuids,
		});
		setIsFetchingRolesForSite(false);
		setSiteRolesMap(result);
	}, [pagination, prevSiteUuids, prevUserUuid, userUuid]);

	useEffect(() => {
		fetchUserRolesForSite();
	}, [fetchUserRolesForSite]);

	useEffect(() => {
		if (!pagination || !siteRolesMap || !Array.isArray(pagination?.data)) {
			return;
		}

		const data: SiteModelWithRoles[] = (pagination?.data || []).map(site => {
			const siteMap = siteRolesMap._embedded.find(
				siteRoleMap => siteRoleMap.team.attributes.site === site.uuid
			);

			if (!siteMap) {
				return {
					...site,
					roles: [],
					hasAccess: false,
				};
			}

			return {
				...site,
				roles: siteMap.roles,
				hasAccess: true,
			};
		});

		setNewPagination({
			...pagination,
			data,
		});
	}, [siteRolesMap, pagination]);

	return [newPagination, isFetchingRolesForSite];
}
export default useSitesPagination;
