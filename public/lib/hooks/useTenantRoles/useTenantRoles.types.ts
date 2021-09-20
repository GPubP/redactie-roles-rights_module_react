import { LoadingState } from '@redactie/utils';

import { RoleModel } from '../../store/roles';

export type UseTenantRolesFunctionReturnType = [
	LoadingState | null,
	RoleModel[] | null | undefined
];

export type UseTenantRolesFunction = () => UseTenantRolesFunctionReturnType;
