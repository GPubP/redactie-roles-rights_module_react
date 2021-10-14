import { LoadingState } from '@redactie/utils';

import { RoleModel } from '../../store/roles';

export type UseUserRolesForSiteFunctionReturnType = [
	LoadingState | null,
	RoleModel[] | null | undefined
];

export type UseUserRolesForSiteFunction = () => UseUserRolesForSiteFunctionReturnType;
