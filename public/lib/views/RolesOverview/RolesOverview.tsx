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
import { FormState } from '../../components/RolesPermissionsList/RolesPermissionsList.types';
import { useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs, useSecurityRights, useSiteNavigate } from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { UpdateRolesMatrixPayload } from '../../services/securityRights';
import {
	ModuleModel,
	RoleModel,
	SecurityRightModel,
	securityRightsMatrixFacade,
} from '../../store/securityRightsMatrix';

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
	const [formValues, setFormValues] = useState<UpdateRolesMatrixPayload | null>(null);
	const { navigate } = useSiteNavigate();
	const { modules = [], securityRights = [], roles = [] } = securityRightMatrix || {};
	const [matrixTitle, setMatrixTitle] = useState<string>('');

	useEffect(() => {
		securityRightsMatrixFacade.getSecurityRightsBySite(rolesSearchParams, siteId);
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
			module: module,
		});
		setMatrixTitle(module);
	};

	const onCancel = (): void => {
		navigate(MODULE_PATHS.roles.overview, { siteId });
	};

	const securityRightsByModule = (
		securityRights: SecurityRightModel[],
		modules: ModuleModel[]
	): RoleSecurityRight[] =>
		securityRights.reduce((acc, right) => {
			const moduleIndex = modules.findIndex(mod => mod.id === right.attributes.module);
			const newAcc = [...acc];
			newAcc[moduleIndex] = {
				...modules[moduleIndex],
				securityRights: (acc[moduleIndex]?.securityRights || []).concat([right]),
			};
			return newAcc;
		}, modules as RoleSecurityRight[]);

	const createInitialFormState = (
		securityRights: SecurityRightModel[],
		roles: RoleModel[]
	): FormState =>
		securityRights.reduce((acc, right) => {
			acc[right.id] = roles.reduce((roleIds, role) => {
				const hasSecurityRight = role.securityRights.find(rightId => rightId === right.id);
				if (hasSecurityRight) {
					roleIds.push(role.role.id);
				}
				return roleIds;
			}, [] as string[]);

			return acc;
		}, {} as FormState);

	const parseFormResult = (formState: FormState): UpdateRolesMatrixPayload =>
		Object.keys(formState).reduce((roles, securityRightId) => {
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

	const onConfigSave = (): void => {
		if (formValues) {
			securityRightsMatrixFacade.updateSecurityRightsForSite(formValues, siteId);
		}
	};

	const onFormChange = (value: FormState): void => {
		const results = parseFormResult(value);

		const updateRolesMatrixData = securityRightMatrix?.roles.map(role => {
			const resultRoleId = results.find(r => r.roleId === role.role.id);
			if (resultRoleId) {
				return resultRoleId;
			}
			return { roleId: role.role.id, securityRights: [] };
		});
		if (updateRolesMatrixData) {
			setFormValues(updateRolesMatrixData);
		}
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!securityRightMatrix) {
			return null;
		}

		return (
			<>
				<div className="row">
					<div className="col-xs-3">
						<ModulesList modules={modules} onClick={handleClick} />
					</div>
					<div className="col-xs-8 u-margin-left">
						<RolesPermissionsList
							roles={roles}
							permissions={securityRightsByModule(securityRights, modules)}
							formState={createInitialFormState(securityRights, roles)}
							onChange={onFormChange}
							title={matrixTitle}
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
