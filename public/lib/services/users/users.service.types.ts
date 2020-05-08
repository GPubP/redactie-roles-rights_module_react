export interface PagingSchema {
	totalElements: number;
	totalPages: boolean;
	size: number;
	number: number;
}

export interface UserSchema {
	address: string;
	domain: string;
	email: string;
	externalMutableReference: string;
	firstname: string;
	id: string;
	lastname: string;
	nickname: string;
	owner: boolean;
	type: string;
	username: string;
}

export interface UsersSchema {
	_embedded: UserSchema[];
	_page: PagingSchema;
}
