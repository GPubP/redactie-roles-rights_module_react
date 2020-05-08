import { useEffect, useState } from 'react';

import { LoadingState } from '../../roles.types';
import { SearchParams } from '../../services/api';
import { getUsersBySite, UsersSchema } from '../../services/users';

const useUsers = (
	searchParams: SearchParams,
	siteId: string
): [LoadingState, UsersSchema | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [users, setUsers] = useState<UsersSchema | null>(null);

	useEffect(() => {
		getUsersBySite(searchParams, siteId)
			.then(result => {
				if (result) {
					setUsers(result);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams, siteId]);

	return [loadingState, users];
};

export default useUsers;
