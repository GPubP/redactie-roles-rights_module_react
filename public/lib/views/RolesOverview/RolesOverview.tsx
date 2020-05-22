import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, ModulesList, RolesPermissionsList } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs, useSecurityRights } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { securityRightsFacade } from '../../store/securityRights';

import { fakeApi } from './RolesOverview.const';
import { RoleSecurityRight } from './RolesOverview.types';

const RolesOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	const [t] = useCoreTranslation();
	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [loadingState, securityRightMatrix] = useSecurityRights();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	useEffect(() => {
		securityRightsFacade.getSecurityRightsBySite(rolesSearchParams, siteId);
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);
	/**
	 * Methods
	 */
	const handleClick = (module: string): any => {
		setRolesSearchParams({
			...rolesSearchParams,
			search: module,
		});
	};

	const onConfigSave = (): void => {
		console.log('save');
	};

	const onCancel = (): void => {
		console.log('cancel');
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!securityRightMatrix) {
			return null;
		}

		const fakeModules = fakeApi.modules;
		const fakePermissions = fakeApi.securityRights;
		const fakeRoles = fakeApi.roles;

		const newArray = fakePermissions.reduce((acc, right) => {
			const moduleIndex = fakeModules.findIndex(mod => mod.id === right.attributes.module);
			const newAcc = [...acc];
			newAcc[moduleIndex] = {
				...fakeModules[moduleIndex],
				securityRights: (acc[moduleIndex].securityRights || []).concat([right]),
			};
			return newAcc;
		}, fakeModules as RoleSecurityRight[]);

		type FormState = { [key: string]: string[] };

		const formState: FormState = fakePermissions.reduce((acc, right) => {
			acc[right.id] = fakeRoles.reduce((roleIds, role) => {
				const hasSecurityRight = role.securityRights.find(rightId => rightId === right.id);
				if (hasSecurityRight) {
					roleIds.push(role.role.id);
				}
				return roleIds;
			}, [] as string[]);

			return acc;
		}, {} as any);

		const state = { permissionId: ['roleId'] };

		interface UpdateRolesMatrixData {
			roleId: string;
			securityRights: string[];
		}

		const obj = (Object.keys(formState) as Array<keyof typeof formState>).reduce(
			(roles, securityRightId) => {
				const roleIds = formState[securityRightId];
				roleIds.forEach((roleId: string) => {
					const role = roles.find((item: any) => item.roleId === roleId);
					if (!role) {
						roles.push({ roleId: roleId, securityRights: [securityRightId as string] });
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
			},
			[] as UpdateRolesMatrixData[]
		);
		// const obj = {
		// 	roles: [
		// 		{roleId: 'string', securityRights: ['string']}
		// 	]
		// }

		console.log(formState);

		return (
			<>
				<div className="row">
					<div className="col-xs-3">
						<ModulesList modules={fakeModules} onClick={handleClick} />
					</div>
					<div className="col-xs-8 u-margin-left">
						<RolesPermissionsList
							roles={securityRightMatrix.roles}
							permissions={newArray}
							formState={formState}
						/>
					</div>
				</div>
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<div className="u-wrapper row end-xs">
							<Button onClick={onCancel} negative>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
							<Button
								className="u-margin-left-xs"
								onClick={onConfigSave}
								type="success"
							>
								{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
							</Button>
						</div>
					</ActionBarContentSection>
				</ActionBar>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Rollen en rechten">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default RolesOverview;
