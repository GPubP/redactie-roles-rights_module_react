import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import { GetUsersPayload, UsersResponse } from './users.service.types';

export class UsersApiService {
	public async getUsersBySite(
		searchParams: GetUsersPayload = DEFAULT_USERS_SEARCH_PARAMS,
		siteId: string
	): Promise<UsersResponse> {
		return await api
			.get(`users-roles/v1/sites/${siteId}/users`, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<UsersResponse>();
	}
}

export const usersApiService = new UsersApiService();
