import { LoadingState } from '@redactie/utils';

import { MySecurityRightModel } from '../../store/mySecurityRights';

export interface UseMySecurityRightsForSiteFunction {
	(options: { siteUuid: string; module?: string; onlyKeys: true }): [
		LoadingState | null,
		string[]
	];
	(options: { siteUuid: string; module?: string; onlyKeys: false }): [
		LoadingState | null,
		MySecurityRightModel[]
	];
	(options: { siteUuid: string; module?: string; onlyKeys: boolean }): [
		LoadingState | null,
		MySecurityRightModel[] | string[]
	];
	(options: { siteUuid: string; module?: string; onlyKeys: boolean }): [
		LoadingState | null,
		MySecurityRightModel[] | string[]
	];
}
