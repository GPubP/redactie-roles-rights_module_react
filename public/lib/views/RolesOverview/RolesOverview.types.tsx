export interface RolesOverviewTableRow {
	uuid: string;
	name: string;
	description: string;
	admin: boolean;
	target: string;
}

export interface OrderBy {
	key: string;
	order: string;
}
