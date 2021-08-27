import { LoadingState } from '@redactie/utils';

import { RoleModel } from '../../store/roles';

export type UseSiteRolesFunctionReturnType = [LoadingState | null, RoleModel[] | null | undefined];

export type UseSiteRolesFunction = () => UseSiteRolesFunctionReturnType;
