import { Page } from '@redactie/utils';

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
	isDeleting: boolean;
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
		isDeleting: false,
	},
	site: {
		roles: [],
		isFetching: false,
		isUpdating: false,
		isCreating: false,
		isDeleting: false,
	},
});
