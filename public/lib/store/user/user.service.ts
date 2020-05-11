import { UserRolesSchema } from '../../services/user';

import { UserStore, userStore } from './user.store';

export class UserService {
	constructor(private store: UserStore) {}

	public updateUser(user: UserRolesSchema): void {
		this.store.update({ user });
	}
}

export const userService = new UserService(userStore);
