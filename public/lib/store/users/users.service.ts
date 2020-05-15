import {
	GetUserPayload,
	GetUsersPayload,
	UpdateUserRolesPayload,
	UsersApiService,
	usersApiService,
} from '../../services/users';

import { UsersStore, usersStore } from './users.store';

export class UsersService {
	constructor(private store: UsersStore, private usersService: UsersApiService) {}

	public getUsers(payload: GetUsersPayload): void {
		this.store.setIsFetching(true);
		this.usersService
			.getUsers(payload)
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

	public getUser(payload: GetUserPayload): void {
		this.store.setIsFetching(true);
		this.usersService
			.getUser(payload)
			.then(response => {
				this.store.update({
					user: response,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}

	public getUserRoles(payload: GetUserPayload): void {
		this.store.setIsFetching(true);
		this.usersService
			.getUserRoles(payload)
			.then(response => {
				this.store.update({
					userRoles: response._embedded,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}

	public updateUserRoles(payload: UpdateUserRolesPayload): void {
		this.store.setIsFetching(true);
		this.usersService
			.updateUserRoles(payload)
			.then(response => {
				//ISSUE: response does not return the updated roles
				console.log(response);
				/* 				this.store.update({
					userRoles: response._embedded,
				}); */
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}
}

export const usersService = new UsersService(usersStore, usersApiService);
