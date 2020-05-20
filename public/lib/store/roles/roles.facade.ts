import { RolesApiService, rolesApiService } from '../../services/roles';

import { rolesQuery, RolesQuery } from './roles.query';
import { rolesStore, RolesStore } from './roles.store';

export class RolesFacade {
	constructor(
		private store: RolesStore,
		private service: RolesApiService,
		private query: RolesQuery
	) {}

	public readonly roles$ = this.query.roles$;
	public readonly error$ = this.query.error$;
	public readonly isFetching$ = this.query.isFetching$;

	public getRoles(): void {
		this.store.setIsFetching(true);
		this.service
			.getRoles()
			.then(response => {
				const roles = response._embedded;
				const meta = response._page;
				this.store.set(roles);
				this.store.update({
					meta,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}
}

export const rolesFacade = new RolesFacade(rolesStore, rolesApiService, rolesQuery);
