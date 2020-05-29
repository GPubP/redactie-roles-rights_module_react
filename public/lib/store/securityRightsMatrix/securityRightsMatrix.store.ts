import { Store, StoreConfig } from '@datorama/akita';

import {
	createInitialSecurityRightsMatrixState,
	SecurityRightsMatrixState,
} from './securityRightsMatrix.model';

@StoreConfig({ name: 'securityRights' })
export class SecurityRightsMatrixStore extends Store<SecurityRightsMatrixState> {
	constructor() {
		super(createInitialSecurityRightsMatrixState());
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

export const securityRightsMatrixStore = new SecurityRightsMatrixStore();
