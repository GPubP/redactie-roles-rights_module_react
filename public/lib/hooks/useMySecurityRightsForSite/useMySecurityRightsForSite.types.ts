import { LoadingState } from '@redactie/utils';

import { MySecurityRightModel } from '../../store/mySecurityRights';

export interface UseMySecurityRightsForSiteFunction {
	(options: { module?: string; onlyKeys: true }): [LoadingState | null, string[]];
	(options: { module?: string; onlyKeys: false }): [LoadingState | null, MySecurityRightModel[]];
	(options: { module?: string; onlyKeys: boolean }): [
		LoadingState | null,
		MySecurityRightModel[] | string[]
	];
	(options: { module?: string; onlyKeys: boolean }): [
		LoadingState | null,
		MySecurityRightModel[] | string[]
	];
}
