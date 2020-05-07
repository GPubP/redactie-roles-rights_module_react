import { useEffect, useState } from 'react';

import { LoadingState } from '../../roles.types';
import { SearchParams } from '../../services/api';
import { getUsers, UsersSchema } from '../../services/users';

const useUsers = (searchParams: SearchParams): [LoadingState, UsersSchema | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [users, setUsers] = useState<UsersSchema | null>(null);

	useEffect(() => {
		getUsers(searchParams)
			.then(result => {
				if (result) {
					console.log(result);
					setUsers(result);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams]);

	return [loadingState, users];
};

export default useUsers;
