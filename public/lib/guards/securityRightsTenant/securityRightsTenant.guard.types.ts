import { GuardFunction } from '@redactie/redactie-core';

export type SecurityRightsTenantGuardFunction = (
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => GuardFunction;
