import {
	GetSecurityRightsPayload,
	securityRightsApiService,
	SecurityRightsApiService,
	UpdateRolesMatrixPayload,
} from '../../services/securityRights';

import { securityRightsMatrixQuery, SecurityRightsMatrixQuery } from './securityRightsMatrix.query';
import { securityRightsMatrixStore, SecurityRightsMatrixStore } from './securityRightsMatrix.store';

export class SecurityRightsMatrixFacade {
	constructor(
		private store: SecurityRightsMatrixStore,
		private service: SecurityRightsApiService,
		private query: SecurityRightsMatrixQuery
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
				this.store.setError(false);
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}

	public updateSecurityRightsForSite(
		payload: UpdateRolesMatrixPayload,
		siteId: string
	): Promise<boolean> {
		this.store.setIsUpdating(true);

		return this.service
			.updateSecurityRightsForSite(siteId, payload)
			.then(response => {
				this.store.update({
					data: response,
				});
				this.store.setError(false);
				return true;
			})
			.catch(err => {
				this.store.setError(err);
				return false;
			})
			.finally(() => this.store.setIsUpdating(false));
	}

	public updateSecurityRightsForSiteByCompartment(
		payload: UpdateRolesMatrixPayload,
		siteId: string,
		type: string,
		id: string
	): Promise<boolean> {
		this.store.setIsUpdating(true);

		return this.service
			.updateSecurityRightsForSiteByCompartment(siteId, payload, type, id)
			.then(response => {
				this.store.update({
					data: response,
				});
				return true;
			})
			.catch(err => {
				this.store.setError(err);
				return false;
			})
			.finally(() => this.store.setIsUpdating(false));
	}
}

export const securityRightsMatrixFacade = new SecurityRightsMatrixFacade(
	securityRightsMatrixStore,
	securityRightsApiService,
	securityRightsMatrixQuery
);
