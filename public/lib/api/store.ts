import { usersQuery, usersService } from '../store/users';

export const store = {
	users: {
		service: {
			getUser: usersService.getUser,
			getUsers: usersService.getUsers,
		},
		query: usersQuery,
	},
};
