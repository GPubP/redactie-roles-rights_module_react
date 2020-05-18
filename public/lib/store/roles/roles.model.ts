import { EntityState } from '@datorama/akita';

import { RoleResponse, RolesMetaResponse, RolesResponse } from '../../services/roles';

export type RoleModel = RoleResponse;
export type RolesModel = RolesResponse;
export type RolesMetaModel = RolesMetaResponse;

export interface RolesState extends EntityState<RolesModel, string> {
	meta?: RolesMetaModel;
	roles?: RoleModel[];
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	isFetching: false,
});
