import { ReactNode } from 'react';

export interface SecurableRenderProps {
	userSecurityRights?: string[];
	requiredSecurityRights?: string[];
	renderOtherwise?: ReactNode;
	oneSecurityRight?: boolean;
	children: ReactNode;
}
