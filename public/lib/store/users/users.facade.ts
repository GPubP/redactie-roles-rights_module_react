import {
	AddUserToSitePayload,
	GetUserPayload,
	GetUsersPayload,
	UpdateUserRolesPayload,
	UsersApiService,
	usersApiService,
} from '../../services/users';

import { UsersQuery, usersQuery } from './users.query';
import { UsersStore, usersStore } from './users.store';

export class UsersFacade {
	constructor(
		private store: UsersStore,
		private service: UsersApiService,
		private query: UsersQuery
	) {}

	public readonly meta$ = this.query.meta$;
	public readonly users$ = this.query.users$;
	public readonly user$ = this.query.user$;
	public readonly userRoles$ = this.query.userRoles$;
	public readonly isFetching$ = this.query.isFetching$;
	public readonly isAddingUserToSite$ = this.query.isAddingUserToSite$;
	public readonly error$ = this.query.error$;

	public getUsers(payload: GetUsersPayload): void {
		this.store.setIsFetching(true);
		this.service
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

	public getUsersBySite(payload: GetUsersPayload, siteId: string): void {
		this.store.setIsFetching(true);
		this.service
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

	public getUser(payload: GetUserPayload): void {
		this.store.setIsFetching(true);
		this.service
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
		this.service
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
		this.service
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

	public addUserToSite(payload: AddUserToSitePayload, fn: () => void): void {
		this.store.setIsAddingUserToSite(true);

		this.service
			.addUserToSite(payload)
			.then(() => {
				console.log('partyyy: user is successfully linked');
				fn();
				// Redirect after success
				// this.store.setIsAddingUserToSite(false);
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsAddingUserToSite(false));
	}
}

export const usersFacade = new UsersFacade(usersStore, usersApiService, usersQuery);
