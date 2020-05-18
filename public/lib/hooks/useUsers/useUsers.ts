import { useObservable } from '@mindspace-io/react';
import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { UserModel, usersFacade, UsersMetaModel, usersQuery } from '../../store/users';

// const useUsersTwo = (): [LoadingState | null, UserModel[], UsersMetaModel | null | undefined] => {
// 	const [loading] = useObservable(usersFacade.isFetching$, null);
// 	const [users] = useObservable(usersFacade.users$, []);
// 	const [meta] = useObservable(usersFacade.meta$, null);
// 	const [error] = useObservable(usersFacade.error$, null);

// 	const loadingState = error ? LoadingState.Error : loading;

// 	return [loadingState, users, meta];
// };

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
