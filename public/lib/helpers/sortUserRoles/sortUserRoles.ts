import { RoleModel } from '../../store/roles';

const sortUserRoles = (roles?: RoleModel[]): Array<RoleModel> => {
	if (!roles) {
		return [];
	}

	const sortedRoles =
		roles &&
		roles.sort((a: RoleModel, b: RoleModel) => {
			if (a.attributes.displayName && b.attributes.displayName) {
				return a.attributes.displayName.localeCompare(b.attributes.displayName);
			}

			return 0;
		});
	return sortedRoles;
};

export default sortUserRoles;
