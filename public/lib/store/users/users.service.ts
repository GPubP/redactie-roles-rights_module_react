import { GetUsersPayload, usersApiService, UsersApiService } from '../../services/users';

import { UsersStore, usersStore } from './users.store';

export class UsersService {
	constructor(private store: UsersStore, private usersService: UsersApiService) {}

	public getUsersBySite(payload: GetUsersPayload, siteId: string): void {
		this.store.setIsFetching(true);
		this.usersService
			.getUsersBySite(payload, siteId)
			.then(response => {
				this.store.setIsFetching(false);
				const users = response._embedded;
				const meta = response._page;

				this.store.set(users);
				this.store.update({
					meta,
				});
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}
}

export const usersService = new UsersService(usersStore, usersApiService);
