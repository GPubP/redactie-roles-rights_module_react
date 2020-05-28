import { GuardFunction } from '@redactie/redactie-core';

export type SecurityRightsSiteGuardFunction = (
	urlSiteParam: string,
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => GuardFunction;
