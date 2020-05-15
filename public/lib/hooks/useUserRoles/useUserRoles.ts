import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { usersQuery } from '../../store/users';

const useUserRoles = (uuid: string | null = null): [LoadingState, RoleModel[] | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [userRoles, setUserRoles] = useState<RoleModel[] | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		if (!uuid) {
			return setLoadingState(LoadingState.Error);
		}

		usersQuery.userRoles$
			.pipe(
				takeUntil(destroyed$),
				filter(userRolesObject => !isNil(userRolesObject)),
				distinctUntilChanged()
			)
			.subscribe(userRolesObject => {
				if (userRolesObject) {
					setUserRoles(userRolesObject);
				}
			});

		usersQuery.isFetching$.pipe(takeUntil(destroyed$)).subscribe(loading => {
			if (loading) {
				return setLoadingState(LoadingState.Loading);
			}

			setLoadingState(LoadingState.Loaded);
		});

		usersQuery
			.selectError()
			.pipe(
				takeUntil(destroyed$),
				filter(error => !isNil(error)),
				distinctUntilChanged()
			)
			.subscribe(() => setLoadingState(LoadingState.Error));

		return () => {
			destroyed$.next(true);
			destroyed$.complete();
		};
	}, [userRoles, uuid]);

	return [loadingState, userRoles];
};

export default useUserRoles;
