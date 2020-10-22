import { alertService } from '../../helpers';
import { ALERT_CONTAINER_IDS } from '../../roles.const';
import {
	GetRolesPayload,
	RolePayload,
	RolesApiService,
	rolesApiService,
} from '../../services/roles';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';

import { getAlertMessages } from './roles.alertMessages';
import { RoleEntityTypes } from './roles.model';
import { rolesQuery, RolesQuery } from './roles.query';
import { rolesStore, RolesStore } from './roles.store';

export class RolesFacade {
	constructor(
		private store: RolesStore,
		private service: RolesApiService,
		private query: RolesQuery
	) {}
	// Tenant
	public readonly tenantRoles$ = this.query.selectRoles(RoleEntityTypes.TENANT);
	public readonly tenantMeta$ = this.query.selectMeta(RoleEntityTypes.TENANT);
	public readonly isFetchingTenantRoles$ = this.query.selectIsFetching(RoleEntityTypes.TENANT);

	// Site
	public readonly siteRoles$ = this.query.selectRoles(RoleEntityTypes.SITE);
	public readonly siteRole$ = this.query.selectRoleDetail(RoleEntityTypes.SITE);
	public readonly siteMeta$ = this.query.selectMeta(RoleEntityTypes.SITE);
	public readonly isCreatingSiteRole$ = this.query.selectIsCreating(RoleEntityTypes.SITE);
	public readonly isFetchingSiteRoles$ = this.query.selectIsFetching(RoleEntityTypes.SITE);
	public readonly isUpdatingSiteRole$ = this.query.selectIsUpdating(RoleEntityTypes.SITE);
	public readonly isDeletingSiteRole$ = this.query.selectIsDeleting(RoleEntityTypes.SITE);

	public readonly error$ = this.query.error$;

	public getTenantRoles(): void {
		this.store.setIsFetching(RoleEntityTypes.TENANT, true);
		this.service
			.getTenantRoles()
			.then(response => {
				const roles = response._embedded;
				const meta = response._page;

				this.store.setRoles(RoleEntityTypes.TENANT, {
					roles,
					meta,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(RoleEntityTypes.TENANT, false));
	}

	public getSiteRoles(
		siteUuid: string,
		payload: GetRolesPayload = DEFAULT_ROLES_SEARCH_PARAMS
	): void {
		this.store.setIsFetching(RoleEntityTypes.SITE, true);
		this.service
			.getSiteRoles(siteUuid, payload)
			.then(response => {
				const roles = response._embedded;
				const meta = response._page;

				this.store.setRoles(RoleEntityTypes.SITE, {
					roles,
					meta,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(RoleEntityTypes.SITE, false));
	}

	public getSiteRole(siteUuid: string, roleId: string): void {
		this.store.setIsFetching(RoleEntityTypes.SITE, true);
		this.service
			.getSiteRole(siteUuid, roleId)
			.then(response => {
				this.store.setRoleDetail(RoleEntityTypes.SITE, response);
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(RoleEntityTypes.SITE, false));
	}

	public createSiteRole(payload: RolePayload): Promise<boolean> {
		this.store.setIsCreating(RoleEntityTypes.SITE, true);
		return this.service
			.createSiteRole(payload)
			.then(() => {
				return true;
			})
			.catch(err => {
				this.store.setError(err);
				return false;
			})
			.finally(() => this.store.setIsCreating(RoleEntityTypes.SITE, false));
	}

	public updateSiteRole(payload: RolePayload): Promise<boolean> {
		const alertMessages = getAlertMessages(payload.body?.name || '');
		this.store.setIsUpdating(RoleEntityTypes.SITE, true);
		return this.service
			.updateSiteRole(payload)
			.then(response => {
				this.store.setRoleDetail(RoleEntityTypes.SITE, response);
				alertService(
					alertMessages.update.success,
					ALERT_CONTAINER_IDS.UPDATE_ROLE_ON_SITE,
					'success'
				);
				return true;
			})
			.catch(err => {
				this.store.setError(err);
				alertService(
					alertMessages.update.error,
					ALERT_CONTAINER_IDS.UPDATE_ROLE_ON_SITE,
					'error'
				);
				return false;
			})
			.finally(() => this.store.setIsUpdating(RoleEntityTypes.SITE, false));
	}

	public deleteSiteRole(payload: RolePayload): Promise<boolean> {
		this.store.setIsDeleting(RoleEntityTypes.SITE, true);
		return this.service
			.deleteSiteRole(payload)
			.then(() => {
				return true;
			})
			.catch(err => {
				this.store.setError(err);

				return false;
			})
			.finally(() => this.store.setIsDeleting(RoleEntityTypes.SITE, false));
	}
}

export const rolesFacade = new RolesFacade(rolesStore, rolesApiService, rolesQuery);
