import { mySecurityRightsFacade, mySecurityRightsQuery } from '../store/mySecurityRights';
import { rolesFacade, rolesQuery } from '../store/roles';
import { securityRightsFacade, securityRightsQuery } from '../store/securityRights';
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
			getSecurityRightsBySite: securityRightsFacade.getSecurityRightsBySite,
		},
		query: securityRightsQuery,
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
