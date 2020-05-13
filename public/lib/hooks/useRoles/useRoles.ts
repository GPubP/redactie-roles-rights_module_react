import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { RoleModel, rolesQuery } from '../../store/roles';

const useRoles = (): [LoadingState, RoleModel[] | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [roles, setRoles] = useState<RoleModel[] | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		rolesQuery.roles$
			.pipe(
				takeUntil(destroyed$),
				filter(rolesObject => !isNil(rolesObject)),
				distinctUntilChanged()
			)
			.subscribe(rolesObject => {
				if (rolesObject) {
					setRoles(rolesObject);
				}
			});

		rolesQuery.isFetching$.pipe(takeUntil(destroyed$)).subscribe(loading => {
			if (loading) {
				return setLoadingState(LoadingState.Loading);
			}

			setLoadingState(LoadingState.Loaded);
		});

		rolesQuery
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
	}, []);

	return [loadingState, roles];
};

export default useRoles;
