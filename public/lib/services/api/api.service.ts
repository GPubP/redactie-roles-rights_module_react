import ky from 'ky';
import { stringify } from 'query-string';

import { SearchParams } from './api.service.types';

export type KyInstance = typeof ky;

// Create ky instance with defaults
const api: KyInstance = ky.create({
	prefixUrl: '/v1/proxy/users-roles/v1',
});

export const parseSearchParams = (searchParams: SearchParams): string => {
	return stringify(searchParams, { arrayFormat: 'comma' });
};

export default api;
