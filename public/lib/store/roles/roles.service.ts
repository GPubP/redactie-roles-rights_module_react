import { rolesApiService, RolesApiService } from '../../services/roles';

import { rolesStore, RolesStore } from './roles.store';

export class RolesService {
	constructor(private store: RolesStore, private rolesService: RolesApiService) {}

	public getRoles(): void {
		this.store.setIsFetching(true);
		this.rolesService
			.getRoles()
			.then(response => {
				this.store.update({
					roles: response._embedded,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}
}

export const rolesService = new RolesService(rolesStore, rolesApiService);
