import { LoadingState } from '@redactie/utils';

export interface RolesLoadingStates {
	isCreatingSiteRole: LoadingState | null;
	isFetchingSiteRoles: LoadingState | null;
	isUpdatingSiteRole: LoadingState | null;
	isDeletingSiteRole: LoadingState | null;
}
