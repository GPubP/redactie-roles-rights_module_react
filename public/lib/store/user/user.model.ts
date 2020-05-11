import { UserRolesSchema } from '../../services/user';

export interface UserState {
	readonly user: UserRolesSchema | null;
}
