export interface UsersOverviewTableRow {
	uuid: string;
	name: string;
	type: string;
	navigate: (userUuid: string) => void;
}
