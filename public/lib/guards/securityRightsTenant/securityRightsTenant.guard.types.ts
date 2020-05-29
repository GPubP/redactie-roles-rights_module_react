import { CanShownFunction, GuardFunction } from '@redactie/redactie-core';

export type SecurityRightsTenantGuardFunction = (
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => GuardFunction;

export type SecurityRightsTenantCanShownFunction = (
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => CanShownFunction;
