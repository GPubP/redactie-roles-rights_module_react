import { LoadingState } from '@redactie/utils';

import { MySecurityRightModel } from '../../store/mySecurityRights';

export interface UseMySecurityRightsForTenantFunction {
	(onlyKeys: true): [LoadingState | null, string[]];
	(onlyKeys: false): [LoadingState | null, MySecurityRightModel[]];
	(onlyKeys: boolean): [LoadingState | null, MySecurityRightModel[] | string[]];
	(onlyKeys: boolean): [LoadingState | null, MySecurityRightModel[] | string[]];
}
