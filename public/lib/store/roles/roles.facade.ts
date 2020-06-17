import { RolesApiService, rolesApiService } from '../../services/roles';

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
	public readonly siteMeta$ = this.query.selectMeta(RoleEntityTypes.SITE);
	public readonly isFetchingSiteRoles$ = this.query.selectIsFetching(RoleEntityTypes.SITE);

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

	public getSiteRoles(siteUuid: string): void {
		this.store.setIsFetching(RoleEntityTypes.SITE, true);
		this.service
			.getSiteRoles(siteUuid)
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
}

export const rolesFacade = new RolesFacade(rolesStore, rolesApiService, rolesQuery);