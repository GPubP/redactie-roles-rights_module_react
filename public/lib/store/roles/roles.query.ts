import { filterNil, Query } from '@datorama/akita';
import { LoadingState } from '@redactie/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { RoleEntityTypes, RoleModel, RolesMetaModel, RolesState } from './roles.model';
import { rolesStore, RolesStore } from './roles.store';

export class RolesQuery extends Query<RolesState> {
	constructor(protected store: RolesStore) {
		super(store);
	}

	private convertBoolToLoadingState(bool: boolean): LoadingState {
		if (bool) {
			return LoadingState.Loading;
		}

		return LoadingState.Loaded;
	}

	// Data
	public selectMeta(type: RoleEntityTypes): Observable<RolesMetaModel | undefined> {
		return this.select(state => state[type].meta).pipe(filterNil, distinctUntilChanged());
	}

	public selectRoles(type: RoleEntityTypes): Observable<RoleModel[]> {
		return this.select(state => state[type].roles).pipe(filterNil, distinctUntilChanged());
	}

	public selectRoleDetail(type: RoleEntityTypes): Observable<RoleModel | undefined> {
		return this.select(state => state[type].roleDetail);
	}

	// State
	public selectIsCreating(type: RoleEntityTypes): Observable<LoadingState> {
		return this.select(state => state[type].isCreating).pipe(
			map(this.convertBoolToLoadingState)
		);
	}

	public selectIsFetching(type: RoleEntityTypes): Observable<LoadingState> {
		return this.select(state => state[type].isFetching).pipe(
			map(this.convertBoolToLoadingState)
		);
	}

	public selectIsUpdating(type: RoleEntityTypes): Observable<LoadingState> {
		return this.select(state => state[type].isUpdating).pipe(
			map(this.convertBoolToLoadingState)
		);
	}

	public selectIsDeleting(type: RoleEntityTypes): Observable<LoadingState> {
		return this.select(state => state[type].isDeleting).pipe(
			map(this.convertBoolToLoadingState)
		);
	}

	public error$ = this.selectError().pipe(filterNil, distinctUntilChanged());
}

export const rolesQuery = new RolesQuery(rolesStore);
