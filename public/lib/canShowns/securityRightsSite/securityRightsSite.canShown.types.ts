import { CanShownFunction } from '@redactie/redactie-core';

export type SecurityRightsSiteCanShownFunction = (
	urlSiteParam: string,
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => CanShownFunction;
