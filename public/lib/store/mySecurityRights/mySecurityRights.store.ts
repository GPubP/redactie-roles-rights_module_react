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
		this.siteRightsCache.active.next(hasCache);
		this.siteRightsCache.siteUuid = siteUuid;
	}

	public setIsFetchingTenantRights(isFetching = false): void {
		this.update({
			isFetchingTenantRights: isFetching,
		});
	}

	public setIsFetchingSiteRights(isFetching = false): void {
		this.update({
			isFetchingSiteRights: isFetching,
		});
	}

	public setTenantRights(tenantRights: MySecurityRightModel[]): void {
		this.update(state => ({
			...state,
			data: {
				...state.data,
				tenantRights,
			},
		}));
	}

	public setSiteRights(siteUuid: string, siteRights: MySecurityRightModel[]): void {
		this.update(state => ({
			...state,
			siteUuid,
			data: {
				...state.data,
				siteRights,
			},
		}));
	}
}

export const mySecurityRightsStore = new MySecurityRightsStore();
