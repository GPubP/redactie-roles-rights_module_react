import { UserRolesSchema } from '../../services/user';

import { internalStore, InternalStore } from './internal.store';

export class InternalService {
	constructor(private store: InternalStore) {}

	public updateUser(user: UserRolesSchema): void {
		this.store.update({ user });
	}
}

export const internalService = new InternalService(internalStore);
