import api, { parseSearchParams } from '../api/api.service';
import { SearchParams } from '../api/api.service.types';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import { UsersSchema } from './users.service.types';

export const getUsers = async (
	searchParams: SearchParams = DEFAULT_USERS_SEARCH_PARAMS
): Promise<UsersSchema | null> => {
	try {
		const response: UsersSchema = await api
			.get(`content/content-types?${parseSearchParams(searchParams)}`)
			.json();

		if (!response) {
			throw new Error('Failed to get content-types');
		}

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
