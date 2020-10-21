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
import { MySecurityRightsStore, mySecurityRightsStore } from '../mySecurityRights';

import { UsersQuery, usersQuery } from './users.query';
import { UsersStore, usersStore } from './users.store';

export class UsersFacade {
	constructor(
		private store: UsersStore,
		private mySecurityRightsStore: MySecurityRightsStore,
		private service: UsersApiService,
		private query: UsersQuery
	) {}

	public readonly meta$ = this.query.meta$;
	public readonly users$ = this.query.users$;
	public readonly user$ = this.query.user$;
	public readonly userRolesForTenant$ = this.query.userRolesForTenant$;
	public readonly userRolesForSite$ = this.query.userRolesForSite$;

	// Loading states
	public readonly isFetching$ = this.query.isFetching$;
	public readonly isFetchingOne$ = this.query.isFetching$;
	public readonly isFetchingUserRolesForTenant$ = this.query.isFetchingUserRolesForTenant$;
	public readonly isUpdating$ = this.query.isUpdating$;
	public readonly isAddingUserToSite$ = this.query.isAddingUserToSite$;

	// Error state
	public readonly error$ = this.query.error$;

	/**
	 * Get calls
	 */

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
		this.store.setIsFetchingOne(true);
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
			.finally(() => this.store.setIsFetchingOne(false));
	}

	public getUserRolesForTenant(payload: GetUserRolesForTenantPayload): void {
		this.store.setIsFetchingUserRolesForTenant(true);
		this.service
			.getUserRolesForTenant(payload)
			.then(response => {
				this.store.setUserDetail({
					tenantRoles: response._embedded,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsFetchingUserRolesForTenant(false));
	}

	public getUserRolesForSite(payload: GetUserRolesForSitePayload): void {
		this.store.setIsFetching(true);
		this.service
			.getUserRolesForSite(payload)
			.then(response => {
				this.store.setUserDetail({
					siteRoles: response._embedded,
				});
			})
			.catch(err => this.store.setError(err))
			.finally(() => this.store.setIsFetching(false));
	}

	/**
	 * Update calls
	 */

	public updateUserRolesForTenant(payload: UpdateUserRolesForTenantPayload): void {
		this.store.setIsUpdating(true);
		this.service
			.updateUserRolesForTenant(payload)
			.then(response => {
				this.mySecurityRightsStore.setTenantRightsCache(false);
				this.store.setUserDetail({
					tenantRoles: response._embedded,
				});
			})
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => this.store.setIsUpdating(false));
	}

	public updateUserRolesForSite(payload: UpdateUserRolesForSitePayload): Promise<void> {
		this.store.setIsUpdating(true);
		return this.service
			.updateUserRolesForSite(payload)
			.then(response => {
				this.mySecurityRightsStore.setSiteRightsCache(false);
				this.store.setUserDetail({
					siteRoles: response._embedded,
				});
			})
			.catch(err => this.store.setError(err))
			.finally(() => this.store.setIsUpdating(false));
	}

	/**
	 * Create calls
	 */

	public addUserToSite(payload: AddUserToSitePayload, fn: () => void): void {
		this.store.setIsAddingUserToSite(true);

		this.service
			.addUserToSite(payload)
			.catch(err => {
				this.store.setError(err);
			})
			.finally(() => {
				fn();
				this.store.setIsAddingUserToSite(false);
			});
	}
}

export const usersFacade = new UsersFacade(
	usersStore,
	mySecurityRightsStore,
	usersApiService,
	usersQuery
);
