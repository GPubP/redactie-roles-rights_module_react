import { RolesRightsCompartmentType } from '../../roles.types';
import { ModuleResponse } from '../../services/securityRights';

export interface ModulesListProps {
	modules: ModuleResponse[] | null | undefined;
	onClick: (module: string, type: RolesRightsCompartmentType | '') => void;
}
