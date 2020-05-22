import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ContentType } from '../../roles.types';
import { RoleModel } from '../../store/roles';
import { SiteModel } from '../../store/sites';
import { UserModel } from '../../store/users';

export interface UserDetailRolesProps extends RouteConfigComponentProps {
	user: UserModel;
	userRoles: RoleModel[];
	roles: RoleModel[];
	sites: SiteModel[];
	onCancel: () => void;
	onSubmit: (user: UserModel, roles: Array<string>, contentType: ContentType) => void;
}

export interface SiteRow {
	siteUuid: string;
	name: string;
	roles: any[];
	hasAccess: boolean;
	editAccess: () => void;
	giveAccess: () => void;
}
