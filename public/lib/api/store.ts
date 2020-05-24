import { rolesQuery, rolesService } from '../store/roles';
import { securityRightsFacade, securityRightsQuery } from '../store/securityRights';
import { usersQuery, usersFacade } from '../store/users';

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
			getRoles: rolesService.getRoles,
		},
		query: rolesQuery,
	},
	securityRights: {
		service: {
			getSecurityRightsBySite: securityRightsFacade.getSecurityRightsBySite,
		},
		query: securityRightsQuery,
	},
};
