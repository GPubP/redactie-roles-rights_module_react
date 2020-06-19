export interface RolesOverviewTableRow {
	uuid: string;
	name: string;
	description: string;
	admin: boolean;
	navigate: (userUuid: string) => void;
}
