import { EntityStore, StoreConfig } from '@datorama/akita';

import { createInitialRolesState, RolesModel, RolesState } from './roles.model';

@StoreConfig({ name: 'roles', idKey: 'uuid' })
export class RolesStore extends EntityStore<RolesState, RolesModel> {
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
