import { ModuleResponse } from '../../services/securityRights';

export interface ModulesListProps {
	modules: ModuleResponse[] | null | undefined;
}
