import { UserResponse } from '../../services/users';

export const getUserName = (user?: UserResponse | null, fallbackName = 'Onbekend'): string => {
	if (!user || (!user.firstname && !user.lastname && !user.username)) {
		return fallbackName;
	}

	if (!user.firstname && !user.lastname) {
		return user.username;
	}

	return `${user.firstname ? user.firstname + ' ' : ''}${user.lastname ? user.lastname : ''}`;
};
