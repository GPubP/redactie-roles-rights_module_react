import api from '../api/api.service';

import { RolesResponse } from './roles.service.types';

export class RolesApiService {
	public async getRoles(): Promise<RolesResponse> {
		return await api.get(`roles`).json<RolesResponse>();
	}
}

export const rolesApiService = new RolesApiService();
