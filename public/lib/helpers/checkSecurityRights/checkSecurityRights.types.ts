export type CheckSecurityRightsFunction = (
	userSecurityRights: string[],
	requiredSecurityRights: string[],
	oneSecurityRight?: boolean
) => boolean;
