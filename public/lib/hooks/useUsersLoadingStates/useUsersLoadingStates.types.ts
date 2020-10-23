import { LoadingState } from '@redactie/utils';

export interface UsersLoadingStates {
	isFetching: LoadingState | null;
	isUpdating: LoadingState | null;
	isAddingUserToSite: LoadingState | null;
}
