import { LoadingState } from '../../roles.types';

export interface UsersLoadingStates {
	isFetching: LoadingState | null;
	isUpdating: LoadingState | null;
	isAddingUserToSite: LoadingState | null;
}
