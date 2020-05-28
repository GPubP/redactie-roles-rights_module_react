import { mySecurityRightsFacade, mySecurityRightsQuery } from '../store/mySecurityRights';
import { rolesFacade, rolesQuery } from '../store/roles';
import {
	securityRightsMatrixFacade,
	securityRightsMatrixQuery,
} from '../store/securityRightsMatrix';
import { usersFacade, usersQuery } from '../store/users';

export const store = {
	users: {
		service: {
			getUsersBySite: usersFacade.getUsersBySite,
			getUser: usersFacade.getUser,
			getUsers: usersFacade.getUsers,
		},
		query: usersQuery,
	},
	roles: {
		service: {
			getSiteRoles: rolesFacade.getSiteRoles,
			getTenantRoles: rolesFacade.getTenantRoles,
		},
		query: rolesQuery,
	},
	securityRights: {
		service: {
			getSecurityRightsBySite: securityRightsMatrixFacade.getSecurityRightsBySite,
		},
		query: securityRightsMatrixQuery,
	},
	mySecurityRights: {
		service: {
			getMyTenantSecurityRights: mySecurityRightsFacade.getMyTenantSecurityRights,
			getMySiteSecurityRights: mySecurityRightsFacade.getMySiteSecurityRights,
			getMySecurityRights: mySecurityRightsFacade.getMySecurityRights,
		},
		query: mySecurityRightsQuery,
	},
};
