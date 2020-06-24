export interface RolesOverviewTableRow {
	uuid: string;
	name: string;
	description: string;
	admin: boolean;
	navigate: (userUuid: string) => void;
}

export interface OrderBy {
	key: string;
	order: string;
}

export interface FilterItemSchema {
	key?: string;
	value: string;
	valuePrefix?: string;
	filterKey: string;
	formvalue?: any;
}

export interface FilterItemsSchema {
	data: FilterItemSchema[];
}
