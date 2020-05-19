import { rolesQuery, rolesService } from '../store/roles';
import { securityRightsFacade, securityRightsQuery } from '../store/securityRights';
import { usersQuery, usersService } from '../store/users';

export const store = {
	users: {
		service: {
			getUsersBySite: usersService.getUsersBySite,
			getUser: usersService.getUser,
			getUsers: usersService.getUsers,
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
