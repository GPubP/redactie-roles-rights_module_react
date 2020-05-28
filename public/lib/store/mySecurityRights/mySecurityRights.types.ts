import { BehaviorSubject } from 'rxjs';

export interface SiteRightsCache {
	active: BehaviorSubject<boolean>;
	siteUuid?: string;
}
