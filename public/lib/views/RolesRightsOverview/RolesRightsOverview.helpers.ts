import { RolesPermissionsFormState } from '../../components';
import {
	ModuleResponse,
	RoleResponse,
	SecurityRightResponse,
	UpdateRolesMatrixPayload,
} from '../../services/securityRights';

import { RoleSecurityRight } from './RolesRightsOverview.types';

export const sortSecurityRightsMatrixRoles = (
	roles: RoleResponse[] | undefined
): RoleResponse['role'][] => {
	return (roles || [])
		.map(role => role.role)
		.sort((a, b) => {
			const nameA = a?.attributes?.displayName || '';
			const nameB = b?.attributes?.displayName || '';
			return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
		});
};

export const parseSecurityRightsByModule = (
	categories: ModuleResponse[],
	contentTypes: ModuleResponse[],
	modules: ModuleResponse[],
	securityRights: SecurityRightResponse[]
): RoleSecurityRight[] => {
	return securityRights.reduce((acc, right) => {
		const newAcc = [...acc];
		const moduleIndex =
			right.attributes.type !== 'content-type'
				? modules.findIndex(mod => mod.id === right.attributes.module)
				: modules.length +
				  contentTypes.findIndex(mod => mod.id === right.attributes.subModule);

		newAcc[moduleIndex] = {
			...categories[moduleIndex],
			type: right.attributes.type,
			securityRights: (acc[moduleIndex]?.securityRights || [])
				.concat([right])
				.sort((a, b) => {
					const nameA = a?.attributes?.displayName || '';
					const nameB = b?.attributes?.displayName || '';
					return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
				}),
		};

		return newAcc;
	}, categories as RoleSecurityRight[]);
};

export const parseSecurityRightsFormState = (
	securityRights: SecurityRightResponse[],
	roles: RoleResponse[]
): RolesPermissionsFormState => {
	return securityRights.reduce((acc, right) => {
		acc[right.id] = roles.reduce((roleIds, role) => {
			const hasSecurityRight = role.securityRights.find(rightId => rightId === right.id);
			if (hasSecurityRight) {
				roleIds.push(role.role.id);
			}
			return roleIds;
		}, [] as string[]);

		return acc;
	}, {} as RolesPermissionsFormState);
};

export const parseRolesSecurityRightsMatrix = (
	formState: RolesPermissionsFormState
): UpdateRolesMatrixPayload => {
	return Object.keys(formState).reduce((roles, securityRightId) => {
		const roleIds = formState[securityRightId];
		roleIds.forEach(roleId => {
			const role = roles.find(item => item.roleId === roleId);
			if (!role) {
				roles.push({ roleId: roleId, securityRights: [securityRightId] });
			} else {
				roles = roles.map(r => {
					if (r.roleId === roleId) {
						return {
							...r,
							securityRights: [...r.securityRights, securityRightId],
						};
					}
					return r;
				});
			}
		});
		return roles;
	}, [] as UpdateRolesMatrixPayload);
};
