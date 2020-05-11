import api, { parseSearchParams } from '../api/api.service';

import { DEFAULT_USERS_SEARCH_PARAMS } from './users.service.const';
import {
	CreateUserPayload,
	GetUserPayload,
	GetUsersPayload,
	UpdateUserPayload,
	UserResponse,
	UsersResponse,
} from './users.service.types';

export class UsersApiService {
	public async getUsers(
		searchParams: GetUsersPayload = DEFAULT_USERS_SEARCH_PARAMS
	): Promise<UsersResponse> {
		return await api
			.get('users', {
				searchParams: parseSearchParams(searchParams),
			})
			.json<UsersResponse>();
	}

	public async getUser({ id }: GetUserPayload): Promise<UserResponse> {
		//TODO: get user from api when it's available

		//return await api.get(`users/${id}`).json<UserResponse>();

		//dummy user object
		const response: UserResponse = {
			address: '',
			domain: 'ICA',
			email: '',
			externalMutableReference: '',
			firstname: 'Maxim',
			id: 'b5ababdc-a1cb-4224-9f1e-d919eda9bdeb',
			lastname: 'De Geyter',
			type: 'mprofiel',
			username: 'ex04103',
			nickname: 'mdg',
			owner: true,
		};

		return response;
	}

	public async createUser(payload: CreateUserPayload): Promise<UserResponse> {
		return await api.post('users', { json: payload }).json();
	}

	public async updateUser({ body, id }: UpdateUserPayload): Promise<UserResponse> {
		return await api.put(`users/${id}`, { json: body }).json();
	}
}

export const usersApiService = new UsersApiService();
