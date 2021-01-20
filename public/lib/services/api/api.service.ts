import Core from '@redactie/redactie-core';
import { SearchParams } from '@redactie/utils';
import ky from 'ky';
import { stringify } from 'query-string';

export type KyInstance = typeof ky;

const CoreConfig = Core.config.getValue('core') || {};

// Create ky instance with defaults
const api: KyInstance = ky.create({
	prefixUrl: '/v1/proxy/admin/users-roles/v1',
	timeout: false,
	headers: {
		'x-tenant-id': CoreConfig.tenantId,
	},
});

export const parseSearchParams = (searchParams: SearchParams): string => {
	return stringify(searchParams, { arrayFormat: 'comma' });
};

export default api;
