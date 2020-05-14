export interface RolePermission {
	id: number;
	name: string;
}

export interface RolesPermissionsProps {
	roles: RolePermission[];
	permissions: RolePermission[];
}
