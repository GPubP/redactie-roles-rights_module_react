import { Store, StoreConfig } from '@datorama/akita';
import { BehaviorSubject } from 'rxjs';

import {
	createInitialMySecurityRightsState,
	MySecurityRightModel,
	MySecurityRightsState,
} from './mySecurityRights.model';
import { SiteRightsCache } from './mySecurityRights.types';

@StoreConfig({ name: 'mySecurityRights' })
export class MySecurityRightsStore extends Store<MySecurityRightsState> {
	public tenantRightsCache = new BehaviorSubject<boolean>(false);
	public siteRightsCache: SiteRightsCache = {
		active: new BehaviorSubject<boolean>(false),
	};

	constructor() {
		super(createInitialMySecurityRightsState());
	}

	public setTenantRightsCache(hasCache: boolean): void {
		if (hasCache !== this.tenantRightsCache.value) {
			this.tenantRightsCache.next(hasCache);
		}
	}

	public setSiteRightsCache(hasCache: boolean, siteUuid?: string): void {
		if (hasCache !== this.siteRightsCache.active.value) {
			this.siteRightsCache.active.next(hasCache);
			this.siteRightsCache.siteUuid = siteUuid;
		}
	}

	public setIsFetching(isFetching = false): void {
		this.update({
			isFetching,
		});
	}

	public setTenantRights(tenantRigths: MySecurityRightModel[]): void {
		this.update(state => ({
			...state,
			data: {
				...state.data,
				tenantRigths,
			},
		}));
	}

	public setSiteRights(siteRigths: MySecurityRightModel[]): void {
		this.update(state => ({
			...state,
			data: {
				...state.data,
				siteRigths,
			},
		}));
	}
}

export const mySecurityRightsStore = new MySecurityRightsStore();
