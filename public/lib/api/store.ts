import { rolesQuery, rolesService } from '../store/roles';
import { usersQuery, usersService } from '../store/users';

export const store = {
	users: {
		service: {
			getUsers: usersService.getUsersBySite,
		},
		query: usersQuery,
	},
	roles: {
		service: {
			getRoles: rolesService.getRolesBySite,
		},
		query: rolesQuery,
	},
};
