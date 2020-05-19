import { EntityStore, StoreConfig } from '@datorama/akita';

import {
	createInitialSecurityRightsState,
	RoleModel,
	SecurityRightsState,
} from './securityRights.model';

@StoreConfig({ name: 'securityRights', idKey: 'id' })
export class SecurityRightsStore extends EntityStore<SecurityRightsState, RoleModel> {
	constructor() {
		super(createInitialSecurityRightsState());
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}
}

export const securityRightsStore = new SecurityRightsStore();
