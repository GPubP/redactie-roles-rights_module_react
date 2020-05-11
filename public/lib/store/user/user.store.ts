import { Store, StoreConfig } from '@datorama/akita';

import { UserState } from './user.model';

export const createInitialUserState = (): UserState => ({
	user: null,
});

@StoreConfig({ name: 'users' })
export class UserStore extends Store<UserState> {
	constructor() {
		super(createInitialUserState());
	}
}

export const userStore = new UserStore();
