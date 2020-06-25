import { Store, StoreConfig } from '@datorama/akita';

import {
	createInitialRolesState,
	RoleEntityState,
	RoleEntityTypes,
	RoleModel,
	RolesState,
} from './roles.model';

@StoreConfig({ name: 'roles' })
export class RolesStore extends Store<RolesState> {
	constructor() {
		super(createInitialRolesState());
	}

	public setIsFetching(type: RoleEntityTypes, isFetching = false): void {
		this.update(state => ({
			...state,
			[type]: {
				...state[type],
				isFetching,
			},
		}));
	}

	public setRoles(type: RoleEntityTypes, entityState: Partial<RoleEntityState>): void {
		this.update(state => ({
			...state,
			[type]: {
				...state[type],
				...entityState,
			},
		}));
	}

	public setRoleDetail(type: RoleEntityTypes, roleDetail: Partial<RoleModel>): void {
		this.update(state => ({
			...state,
			[type]: {
				...state[type],
				roleDetail,
			},
		}));
	}
}

export const rolesStore = new RolesStore();
