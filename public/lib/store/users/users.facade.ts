import { BaseEntityFacade } from '@redactie/utils';

import { alertService } from '../../helpers';
import { ALERT_CONTAINER_IDS } from '../../roles.const';
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

import { getAlertMessages } from './users.alertMessages';
import { UsersQuery, usersQuery } from './users.query';
import { UsersStore, usersStore } from './users.store';
import { AlertOptions } from './users.types';

export class UsersFacade extends BaseEntityFacade<UsersStore, UsersApiService, UsersQuery> {
	constructor(
		protected store: UsersStore,
		private mySecurityRightsStore: MySecurityRightsStore,
		protected service: UsersApiService,
		protected query: UsersQuery
	) {
		super(store, service, query);
	}

	public readonly meta$ = this.query.meta$;
	public readonly users$ = this.query.users$;
	public readonly user$ = this.query.user$;
	public readonly userRolesForTenant$ = this.query.userRolesForTenant$;
	public readonly userRolesForSite$ = this.query.userRolesForSite$;

	// Loading states
	public readonly isFetchingUserRolesForTenant$ = this.query.isFetchingUserRolesForTenant$;
	public readonly isAddingUserToSite$ = this.query.isAddingUserToSite$;

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
				const users = response._embedded;
				const meta = response._page;

				this.store.set(users);
				this.store.update({
					meta,
				});
				this.store.setIsFetching(false);
			})
			.catch(err => {
				this.store.setIsFetching(false);
				this.store.setError(err);
			});
	}

	public getTenantUsersBySite(payload: GetUsersPayload, siteId: string): void {
		this.store.setIsFetching(true);

		this.service
			.getTenantUsersBySite(payload, siteId)
			.then(response => {
				const users = response._embedded;
				const meta = response._page;

				this.store.set(users);
				this.store.update({
					meta,
				});
				this.store.setIsFetching(false);
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

	public getTenantUserBySite(payload: GetUserPayload, siteId: string): void {
		this.store.setIsFetchingOne(true);
		this.service
			.getTenantUserBySite(payload, siteId)
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

	public updateUserRolesForTenant(payload: UpdateUserRolesForTenantPayload): Promise<void> {
		const state = this.store.getValue();
		const alertMessages = getAlertMessages(
			`${state.userDetail?.firstname} ${state.userDetail?.lastname}`
		);
		this.store.setIsUpdating(true);
		return this.service
			.updateUserRolesForTenant(payload)
			.then(response => {
				this.mySecurityRightsStore.setTenantRightsCache(false);
				this.store.setUserDetail({
					tenantRoles: response._embedded,
				});

				setTimeout(
					() =>
						alertService(
							alertMessages.update.success,
							ALERT_CONTAINER_IDS.USERS_OVERVIEW,
							'success'
						),
					300
				);
			})
			.catch(err => {
				this.store.setError(err);
				alertService(
					alertMessages.update.error,
					ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_TENANT,
					'error'
				);

				throw err;
			})
			.finally(() => this.store.setIsUpdating(false));
	}

	public updateUserRolesForSite(
		payload: UpdateUserRolesForSitePayload,
		options: AlertOptions = {
			errorAlertContainerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
			successAlertContainerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
		}
	): Promise<void> {
		const state = this.store.getValue();
		const alertMessages = getAlertMessages(
			`${state.userDetail?.firstname} ${state.userDetail?.lastname}`
		);
		this.store.setIsUpdating(true);
		return this.service
			.updateUserRolesForSite(payload)
			.then(response => {
				this.mySecurityRightsStore.setSiteRightsCache(false);
				this.store.setUserDetail({
					siteRoles: response._embedded,
				});
				alertService(
					alertMessages.update.success,
					options.successAlertContainerId,
					'success'
				);
			})
			.catch(err => {
				this.store.setError(err);
				alertService(alertMessages.update.error, options.errorAlertContainerId, 'error');
			})
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

	public clearUser(): void {
		this.store.setUserDetail(undefined);
		this.store.setError(undefined);
	}
}

export const usersFacade = new UsersFacade(
	usersStore,
	mySecurityRightsStore,
	usersApiService,
	usersQuery
);
