import { RoleResponse, RolesMetaResponse } from '../../services/roles';

export enum RoleEntityTypes {
	TENANT = 'tenant',
	SITE = 'site',
}

export type RoleModel = RoleResponse;
export type RolesMetaModel = RolesMetaResponse;

export interface RoleEntityState {
	meta?: RolesMetaModel;
	roles: RoleModel[];
	isFetching: boolean;
}

export interface RolesState {
	tenant: RoleEntityState;
	site: RoleEntityState;
}

export const createInitialRolesState = (): RolesState => ({
	tenant: {
		roles: [],
		isFetching: false,
	},
	site: {
		roles: [],
		isFetching: false,
	},
});
