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
			gitSiteRoles: rolesFacade.getSiteRoles,
			gitTenantRoles: rolesFacade.getTenantRoles,
		},
		query: rolesQuery,
	},
	securityRights: {
		service: {
			getSecurityRightsBySite: securityRightsMatrixFacade.getSecurityRightsBySite,
		},
		query: securityRightsMatrixQuery,
	},
};
