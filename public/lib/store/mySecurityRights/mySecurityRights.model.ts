import { SecurityRightResponse } from '../../services/securityRights';

export type MySecurityRightModel = SecurityRightResponse;

export interface MySecurityRightsState {
	data: {
		tenantRights: MySecurityRightModel[] | null;
		siteRights: MySecurityRightModel[] | null;
	};
	siteUuid?: string;
	isFetching: boolean;
}

export const createInitialMySecurityRightsState = (): MySecurityRightsState => ({
	data: {
		tenantRights: null,
		siteRights: null,
	},
	isFetching: false,
});
