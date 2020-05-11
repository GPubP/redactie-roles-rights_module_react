import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { UserModel, usersQuery } from '../../store/users';

const useUser = (uuid: string | null = null): [LoadingState, UserModel | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		if (!uuid) {
			return setLoadingState(LoadingState.Error);
		}

		usersQuery.user$
			.pipe(
				takeUntil(destroyed$),
				filter(userObject => !isNil(userObject)),
				distinctUntilChanged()
			)
			.subscribe(userObject => {
				if (userObject) {
					setUser(userObject);
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
	}, [user, uuid]);

	return [loadingState, user];
};

export default useUser;
