import {
	GetSecurityRightsPayload,
	securityRightsApiService,
	SecurityRightsApiService,
} from '../../services/securityRights';

import { securityRightsQuery, SecurityRightsQuery } from './securityRights.query';
import { securityRightsStore, SecurityRightsStore } from './securityRights.store';

export class SecurityRightsFacade {
	constructor(
		private store: SecurityRightsStore,
		private service: SecurityRightsApiService,
		private query: SecurityRightsQuery
	) {}

	public readonly data$ = this.query.data$;

	public readonly error$ = this.query.error$;
	public readonly isFetching$ = this.query.isFetching$;

	public getSecurityRightsBySite(payload: GetSecurityRightsPayload, siteId: string): void {
		this.store.setIsFetching(true);
		this.service
			.getRolesBySite(payload, siteId)
			.then(response => {
				this.store.update({
					data: response,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}
}

export const securityRightsFacade = new SecurityRightsFacade(
	securityRightsStore,
	securityRightsApiService,
	securityRightsQuery
);
