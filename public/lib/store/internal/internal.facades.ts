import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserRolesSchema } from '../../services/user';

import { internalQuery } from './internal.query';

export const useUserFacade = (): UserRolesSchema | null => {
	const [user, setUser] = useState<UserRolesSchema | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		internalQuery.user$.pipe(takeUntil(destroyed$)).subscribe((user: any) => {
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
