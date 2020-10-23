import { filterNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { UsersState } from './users.model';
import { usersStore } from './users.store';

export class UsersQuery extends BaseEntityQuery<UsersState> {
	public meta$ = this.select(state => state.meta).pipe(filterNil, distinctUntilChanged());
	public users$ = this.selectAll();
	public user$ = this.select(state => state.userDetail).pipe(filterNil, distinctUntilChanged());
	public userRolesForTenant$ = this.select(state => state.userDetail?.tenantRoles).pipe(
		filterNil,
		distinctUntilChanged()
	);
	public userRolesForSite$ = this.select(state => state.userDetail?.siteRoles).pipe(
		filterNil,
		distinctUntilChanged()
	);

	public isFetchingUserRolesForTenant$ = this.select(
		state => state.isFetchingUserRolesForTenant
	).pipe(map(this.convertBoolToLoadingState));

	public isAddingUserToSite$ = this.select(state => state.isAddingUserToSite).pipe(
		map(this.convertBoolToLoadingState)
	);
}

export const usersQuery = new UsersQuery(usersStore);
