import api, { parseSearchParams } from '../api/api.service';
import { SearchParams } from '../api/api.service.types';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import { UsersSchema } from './users.service.types';

export const getUsersBySite = async (
	searchParams: SearchParams = DEFAULT_USERS_SEARCH_PARAMS,
	siteId: string
): Promise<UsersSchema | null> => {
	try {
		const response: UsersSchema = await api
			.get(`users-roles/v1/sites/${siteId}/users?${parseSearchParams(searchParams)}`)
			.json();

		if (!response) {
			throw new Error('Failed to get users of site');
		}

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
