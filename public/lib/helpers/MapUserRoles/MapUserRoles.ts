import { RoleModel } from '../../store/roles';

const mapUserRoles = (roles?: RoleModel[]): Array<string> => {
	if (!roles) {
		return [];
	}
	const rolesArray = roles && roles.map((role: RoleModel) => role.id);
	return rolesArray;
};

export default mapUserRoles;
