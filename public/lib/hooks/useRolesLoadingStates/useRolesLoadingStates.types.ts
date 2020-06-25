import { LoadingState } from '../../roles.types';

export interface RolesLoadingStates {
	isCreatingSiteRole: LoadingState | null;
	isFetchingSiteRoles: LoadingState | null;
	isUpdatingSiteRole: LoadingState | null;
}
