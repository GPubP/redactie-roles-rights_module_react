import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { UserModel, UsersMetaModel, usersQuery } from '../../store/users';

const useUsers = (): [LoadingState, UserModel[], UsersMetaModel | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [users, setUsers] = useState<UserModel[]>([]);
	const [usersMeta, setUsersMeta] = useState<UsersMetaModel | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		usersQuery
			.selectAll()
			.pipe(
				takeUntil(destroyed$),
				filter(users => !isNil(users)),
				distinctUntilChanged()
			)
			.subscribe(users => setUsers(users));

		usersQuery.meta$
			.pipe(
				takeUntil(destroyed$),
				filter(meta => !isNil(meta)),
				distinctUntilChanged()
			)
			.subscribe(meta => {
				if (meta) {
					setUsersMeta(meta);
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
	}, []);

	return [loadingState, users, usersMeta];
};

export default useUsers;
