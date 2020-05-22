import {
	GetSecurityRightsPayload,
	securityRightsApiService,
	SecurityRightsApiService,
	UpdateRolesMatrixPayload,
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
	public readonly isUpdating$ = this.query.isUpdating$;

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

	public updateSecurityRightsForSite(
		payload: UpdateRolesMatrixPayload,
		siteId: string
	): Promise<void> {
		this.store.setIsUpdating(true);
		return this.service
			.updateSecurityRightsForSite(siteId, payload)
			.then(response => {
				console.log('update user site roles success', response);
			})
			.catch(err => this.store.setError(err))
			.finally(() => this.store.setIsUpdating(false));
	}
}

export const securityRightsFacade = new SecurityRightsFacade(
	securityRightsStore,
	securityRightsApiService,
	securityRightsQuery
);
