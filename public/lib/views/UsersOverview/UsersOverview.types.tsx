export interface UsersOverviewTableRow {
	uuid: string;
	name: string;
	status: string;
	type: string;
	added: string;
	navigate: (userUuid: string) => void;
}

export interface OrderBy {
	key: string;
	order: string;
}
