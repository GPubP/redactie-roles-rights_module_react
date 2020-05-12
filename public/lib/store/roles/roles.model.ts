import { EntityState } from '@datorama/akita';

import { RoleResponse, RolesResponse } from '../../services/roles';

export type RoleModel = RoleResponse;
export type RolesModel = RolesResponse;

export interface RolesState extends EntityState<RolesModel, string> {
	roles?: RolesModel;
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	loading: false,
	isFetching: false,
});
