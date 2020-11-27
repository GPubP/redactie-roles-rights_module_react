import { SiteModel } from '@redactie/sites-module';

import { RoleModel } from '../../store/roles';

export interface SiteModelWithRoles extends SiteModel {
	roles: RoleModel[];
	hasAccess: boolean;
}
