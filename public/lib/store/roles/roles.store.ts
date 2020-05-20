import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialRolesState, RoleModel, RolesState } from './roles.model';

@StoreConfig({ name: 'roles', idKey: 'id' })
export class RolesStore extends EntityStore<RolesState, RoleModel> {
	constructor() {
		super(createInitialRolesState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}
}

export const rolesStore = new RolesStore();
