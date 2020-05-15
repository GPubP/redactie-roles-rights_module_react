import { usersQuery, usersService } from '../store/users';

export const store = {
	users: {
		service: {
			getUsers: usersService.getUsersBySite,
		},
		query: usersQuery,
	},
};
