import { CanShownFunction } from '@redactie/redactie-core';

export type SecurityRightsTenantCanShownFunction = (
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => CanShownFunction;
