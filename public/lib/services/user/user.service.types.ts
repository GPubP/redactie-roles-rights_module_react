export interface UserSchema {
	address: string | null;
	domain: string;
	email: string;
	externalMutableReference: string;
	firstname: string;
	id: string;
	lastname: string;
	nickname: string | null;
	type: string;
	username: string;
}

export interface UserRolesSchema {
	user: UserSchema;
	roles: any; // to be decided
}
