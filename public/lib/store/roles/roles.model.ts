import { Page } from '../../roles.types';
import { RoleResponse } from '../../services/roles';

export enum RoleEntityTypes {
	TENANT = 'tenant',
	SITE = 'site',
}

export type RoleModel = RoleResponse;
export type RolesMetaModel = Page;

export interface RoleEntityState {
	meta?: RolesMetaModel;
	roles: RoleModel[];
	roleDetail?: RoleModel;
	isFetching: boolean;
	isUpdating: boolean;
	isCreating: boolean;
}

export interface RolesState {
	tenant: RoleEntityState;
	site: RoleEntityState;
}

export const createInitialRolesState = (): RolesState => ({
	tenant: {
		roles: [],
		isFetching: false,
		isUpdating: false,
		isCreating: false,
	},
	site: {
		roles: [],
		isFetching: false,
		isUpdating: false,
		isCreating: false,
	},
});
