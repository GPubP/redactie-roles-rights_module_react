import { alertService } from '../../helpers';
import { ALERT_CONTAINER_IDS } from '../../roles.const';
import {
	GetSecurityRightsPayload,
	securityRightsApiService,
	SecurityRightsApiService,
	UpdateRolesMatrixPayload,
} from '../../services/securityRights';
import { SelectedCompartment } from '../../views/RolesRightsOverview/RolesRightsOverview.types';
import { MySecurityRightsFacade, mySecurityRightsFacade } from '../mySecurityRights';

import { getAlertMessages } from './securityRightsMatrix.alertMessages';
import { securityRightsMatrixQuery, SecurityRightsMatrixQuery } from './securityRightsMatrix.query';
import { securityRightsMatrixStore, SecurityRightsMatrixStore } from './securityRightsMatrix.store';

export class SecurityRightsMatrixFacade {
	constructor(
		private mySecurityRightsFacade: MySecurityRightsFacade,
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
		siteId: string,
		options = {
			containerId: ALERT_CONTAINER_IDS.UPDATE_SECURITY_RIGHTS_ON_SITE,
		}
	): Promise<boolean> {
		const alertMessages = getAlertMessages();
		this.store.setIsUpdating(true);

		return this.service
			.updateSecurityRightsForSite(siteId, payload)
			.then(response => {
				this.store.update({
					data: response,
				});
				this.store.setError(false);
				this.mySecurityRightsFacade.invalidateCache();
				alertService(alertMessages.update.success, options.containerId, 'success');

				return true;
			})
			.catch(err => {
				this.store.setError(err);
				alertService(alertMessages.update.error, options.containerId, 'error');

				return false;
			})
			.finally(() => this.store.setIsUpdating(false));
	}

	public updateSecurityRightsForSiteByCompartment(
		payload: UpdateRolesMatrixPayload,
		siteId: string,
		compartment: SelectedCompartment & { name: string },
		options = {
			containerId: ALERT_CONTAINER_IDS.UPDATE_SECURITY_RIGHTS_ON_SITE,
		}
	): Promise<boolean> {
		const alertMessages = getAlertMessages(compartment.name);
		this.store.setIsUpdating(true);

		return this.service
			.updateSecurityRightsForSiteByCompartment(
				siteId,
				payload,
				compartment.type,
				compartment.id
			)
			.then(response => {
				this.store.update({
					data: response,
				});
				this.mySecurityRightsFacade.invalidateCache();
				alertService(alertMessages.updateOne.success, options.containerId, 'success');

				return true;
			})
			.catch(err => {
				this.store.setError(err);
				alertService(alertMessages.updateOne.error, options.containerId, 'error');

				return false;
			})
			.finally(() => this.store.setIsUpdating(false));
	}
}

export const securityRightsMatrixFacade = new SecurityRightsMatrixFacade(
	mySecurityRightsFacade,
	securityRightsMatrixStore,
	securityRightsApiService,
	securityRightsMatrixQuery
);
