import { RoleModel } from '../../store/roles';

const sortUserRoles = (roles?: RoleModel[]): Array<RoleModel> => {
	if (!roles) {
		return [];
	}

	const sortedRoles =
		roles &&
		roles.sort((a: RoleModel, b: RoleModel) => {
			return a.attributes.displayName.localeCompare(b.attributes.displayName);
		});
	return sortedRoles;
};

export default sortUserRoles;
