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
};
