import {
	AddUserToSitePayload,
	GetUserPayload,
	GetUserRolesForSitePayload,
	GetUserRolesForTenantPayload,
	GetUsersPayload,
	UpdateUserRolesForSitePayload,
	UpdateUserRolesForTenantPayload,
	usersApiService,
	UsersApiService,
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
	public readonly userRolesForTenant$ = this.query.userRolesForTenant$;
	public readonly userRolesForSite$ = this.query.userRolesForSite$;
	public readonly isFetching$ = this.query.isFetching$;
	public readonly isUpdating$ = this.query.isUpdating$;
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
				this.store.setUserDetail({
					...response,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}

	public getUserRolesForTenant(payload: GetUserRolesForTenantPayload): void {
		this.store.setIsFetching(true);
		this.service
			.getUserRolesForTenant(payload)
			.then(response => {
				this.store.setUserDetail({
					activeTenantRoles: response._embedded,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetching(false));
	}

	public updateUserRolesForTenant(payload: UpdateUserRolesForTenantPayload): void {
		this.store.setIsUpdating(true);
		this.service
			.updateUserRolesForTenant(payload)
			.then(response => {
				//ISSUE: response does not return the updated roles
				console.log('update user tenant roles success', response);
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsUpdating(false));
	}

	public getUserRolesForSite(payload: GetUserRolesForSitePayload): void {
		this.store.setIsFetching(true);
		this.service
			.getUserRolesForSite(payload)
			.then(response => {
				this.store.setUserDetail({
					activeSiteRoles: response._embedded,
				});
			})
			.catch(err => this.store.setError(err))
			.finally(() => this.store.setIsFetching(false));
	}

	public updateUserRolesForSite(payload: UpdateUserRolesForSitePayload): Promise<void> {
		this.store.setIsUpdating(true);
		return this.service
			.updateUserRolesForSite(payload)
			.then(response => {
				console.log('update user site roles success', response);
			})
			.catch(err => this.store.setError(err))
			.finally(() => this.store.setIsUpdating(false));
	}

	public addUserToSite(payload: AddUserToSitePayload, fn: () => void): void {
		this.store.setIsAddingUserToSite(true);

		this.service
			.addUserToSite(payload)
			.then(() => {
				fn();
				this.store.setIsAddingUserToSite(false);
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsAddingUserToSite(false));
	}
}

export const usersFacade = new UsersFacade(usersStore, usersApiService, usersQuery);
