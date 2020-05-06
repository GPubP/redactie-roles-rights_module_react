import { useEffect, useState } from 'react';

import { LoadingState } from '../../roles.types';
import { SearchParams } from '../../services/api';
import { getUsers, UsersSchema } from '../../services/users';

const useContentTypes = (searchParams: SearchParams): [LoadingState, UsersSchema | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [contentTypes, setContentTypes] = useState<UsersSchema | null>(null);

	useEffect(() => {
		getUsers(searchParams)
			.then(result => {
				if (result) {
					setContentTypes(result);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams]);

	return [loadingState, contentTypes];
};

export default useContentTypes;
