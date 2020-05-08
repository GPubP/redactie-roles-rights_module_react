import { useEffect, useState } from 'react';

import { LoadingState } from '../../roles.types';
import { getUser, UserRolesSchema } from '../../services/user';

const useUser = (uuid: string | null = null): [LoadingState, UserRolesSchema | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [user, setUser] = useState<UserRolesSchema | null>(null);

	useEffect(() => {
		if (!uuid) {
			return setLoadingState(LoadingState.Error);
		}

		setLoadingState(LoadingState.Loading);
		getUser(uuid as string)
			.then((result: any) => {
				if (result) {
					setUser(result);
				}

				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [uuid]);

	return [loadingState, user];
};

export default useUser;
