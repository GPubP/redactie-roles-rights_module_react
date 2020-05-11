import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserModel } from '../../api/api.types';

import { usersQuery } from './users.query';

export const useUserFacade = (): UserModel | null => {
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		usersQuery.user$.pipe(takeUntil(destroyed$)).subscribe((user: any) => {
			if (user) {
				return setUser(user);
			}
		});

		return () => {
			destroyed$.next(true);
			destroyed$.complete();
		};
	}, [user]);

	return user;
};
