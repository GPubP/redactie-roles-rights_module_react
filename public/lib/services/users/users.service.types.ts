export interface PagingSchema {
	total: number;
	moreResults: boolean;
	limit: number;
	skip: number;
}

export interface UserSchema {
	_id: string;
	uuid?: string;
	name: string;
	status: string;
	type: string;
	added: string;
}

export interface UsersSchema {
	data: UserSchema[];
	paging: PagingSchema;
}
