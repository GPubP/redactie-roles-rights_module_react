import { mySecurityRightsFacade, mySecurityRightsQuery } from '../store/mySecurityRights';
import { rolesFacade, rolesQuery } from '../store/roles';
import {
	securityRightsMatrixFacade,
	securityRightsMatrixQuery,
} from '../store/securityRightsMatrix';
import { usersFacade, usersQuery } from '../store/users';

export const store = {
	users: {
		service: {
			getUsersBySite: usersFacade.getUsersBySite.bind(usersFacade),
			getUser: usersFacade.getUser.bind(usersFacade),
			getUsers: usersFacade.getUsers.bind(usersFacade),
		},
		query: usersQuery,
	},
	roles: {
		service: {
			getSiteRoles: rolesFacade.getSiteRoles.bind(rolesFacade),
			getTenantRoles: rolesFacade.getTenantRoles.bind(rolesFacade),
		},
		query: rolesQuery,
	},
	securityRights: {
		service: {
			getSecurityRightsBySite: securityRightsMatrixFacade.getSecurityRightsBySite.bind(
				securityRightsMatrixFacade
			),
		},
		query: securityRightsMatrixQuery,
	},
	mySecurityRights: {
		service: {
			getMyTenantSecurityRights: mySecurityRightsFacade.getMyTenantSecurityRights.bind(
				mySecurityRightsFacade
			),
			getMySiteSecurityRights: mySecurityRightsFacade.getMySiteSecurityRights.bind(
				mySecurityRightsFacade
			),
			getMySecurityRights: mySecurityRightsFacade.getMySecurityRights.bind(
				mySecurityRightsFacade
			),
		},
		query: mySecurityRightsQuery,
	},
};
