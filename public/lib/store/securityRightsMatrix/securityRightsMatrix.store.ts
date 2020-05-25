import { Store, StoreConfig } from '@datorama/akita';

import {
	createInitialSecurityRightsState,
	SecurityRightsState,
} from './securityRightsMatrix.model';

@StoreConfig({ name: 'securityRights' })
export class SecurityRightsStore extends Store<SecurityRightsState> {
	constructor() {
		super(createInitialSecurityRightsState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}

	public setIsUpdating(isUpdating = false): void {
		this.update({
			isUpdating,
		});
	}
}

export const securityRightsStore = new SecurityRightsStore();
