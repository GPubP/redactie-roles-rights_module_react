import { SiteListModel } from '@redactie/sites-module';

import { RoleModel } from '../../store/roles';

export interface SiteModelWithRoles extends SiteListModel {
	roles: RoleModel[];
	hasAccess: boolean;
}
