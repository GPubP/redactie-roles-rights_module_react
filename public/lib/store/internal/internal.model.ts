import { UserRolesSchema } from '../../services/user';

export interface InternalState {
	readonly user: UserRolesSchema | null;
}
