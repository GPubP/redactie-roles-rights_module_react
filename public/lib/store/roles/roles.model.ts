import { EntityState } from '@datorama/akita';

import { RoleMetaResponse, RoleResponse } from '../../services/roles';

export type RoleModel = RoleResponse;
export type RolesMetaModel = RoleMetaResponse;

export interface RolesState extends EntityState<RoleModel, string> {
	meta?: RolesMetaModel;
	role?: RoleModel;
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	loading: false,
	isFetching: false,
});
