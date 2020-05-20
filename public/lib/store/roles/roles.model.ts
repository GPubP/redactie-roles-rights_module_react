import { EntityState } from '@datorama/akita';

import { RoleResponse, RolesMetaResponse } from '../../services/roles';

export type RoleModel = RoleResponse;
export type RolesMetaModel = RolesMetaResponse;

export interface RolesState extends EntityState<RoleModel, string> {
	meta?: RolesMetaModel;
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	isFetching: false,
});
