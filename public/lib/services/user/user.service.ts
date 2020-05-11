import { api } from '../api';

import { UserRolesSchema } from './user.service.types';

export const getUser = async (uuid: string): Promise<UserRolesSchema | null> => {
	try {
		//TODO: fetch user from api when it's available

		//const response: UserRolesSchema = await api.get(`users/${uuid}`).json();
		const response: UserRolesSchema = {
			user: {
				address: null,
				domain: 'ICA',
				email: '',
				externalMutableReference: '',
				firstname: 'Maxim',
				id: 'b5ababdc-a1cb-4224-9f1e-d919eda9bdeb',
				lastname: 'De Geyter',
				nickname: null,
				type: 'mprofiel',
				username: 'ex04103',
			},
			roles: [
				{
					name: 'Tenantbeheerder',
				},
				{
					name: 'Contentbeheerder',
				},
			],
		};
		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
