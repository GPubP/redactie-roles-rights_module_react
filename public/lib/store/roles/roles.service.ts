import { GetRolesPayload, rolesApiService, RolesApiService } from '../../services/roles';

import { RolesStore, rolesStore } from './roles.store';

export class RolesService {
	constructor(private store: RolesStore, private rolesService: RolesApiService) {}

	public getRolesBySite(payload: GetRolesPayload, siteId: string): void {
		this.store.setIsFetching(true);
		this.rolesService
			.getRolesBySite(payload, siteId)
			.then(response => {
				this.store.setIsFetching(false);
				const roles = response._embedded;
				const meta = response._page;

				this.store.set(roles);
				this.store.update({
					meta,
				});
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}
}

export const rolesService = new RolesService(rolesStore, rolesApiService);
