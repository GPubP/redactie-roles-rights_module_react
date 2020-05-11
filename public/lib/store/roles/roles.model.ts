import { EntityState } from '@datorama/akita';

import { RolesResponse } from '../../services/roles';

export type RolesModel = RolesResponse;

export interface RolesState extends EntityState<RolesModel, string> {
	roles?: RolesModel;
	isFetching: boolean;
}

export const createInitialRolesState = (): RolesState => ({
	loading: false,
	isFetching: false,
});
