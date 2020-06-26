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

import { DataLoader, ModulesList, RolesPermissionsList, SecurableRender } from '../../components';
import { FormState } from '../../components/RolesPermissionsList/RolesPermissionsList.types';
import { useCoreTranslation } from '../../connectors/translations';
import {
	useMySecurityRightsForSite,
	useRoutesBreadcrumbs,
	useSecurityRights,
	useSiteNavigate,
} from '../../hooks';
import { MODULE_PATHS, SecurityRightsSite } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { ModuleResponse, UpdateRolesMatrixPayload } from '../../services/securityRights';
import { securityRightsMatrixFacade } from '../../store/securityRightsMatrix';

import { RoleSecurityRight } from './RolesRightsOverview.types';

const RolesRightsOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;
	const [t] = useCoreTranslation();

	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [fetchLoadingState, updateLoadingState, securityRightMatrix] = useSecurityRights();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [securityRightsByModule, setSecurityRightsByModule] = useState<
		RoleSecurityRight[] | null
	>(null);
	const [initialFormstate, setInitialFormstate] = useState<FormState | null>(null);
	const [formValues, setFormValues] = useState<UpdateRolesMatrixPayload | null>(null);
	const [categories, setCategories] = useState<ModuleResponse[] | null>(null);
	const { navigate } = useSiteNavigate();
	const { modules = [], securityRights = [], roles = [], contentTypes = [] } =
		securityRightMatrix || {};
	const [matrixTitle, setMatrixTitle] = useState<string>('');
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		onlyKeys: true,
	});

	useEffect(() => {
		securityRightsMatrixFacade.getSecurityRightsBySite(rolesSearchParams, siteId);
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (
			fetchLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading &&
			securityRightsByModule &&
			initialFormstate
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [initialFormstate, fetchLoadingState, mySecurityRightsLoadingState, securityRightsByModule]);

	useEffect(() => {
		const securityRightsByModuleResult = securityRights.reduce((acc, right) => {
			const allCategories = modules.concat(contentTypes);
			const moduleIndex =
				right.attributes.type !== 'content-type'
					? modules.findIndex(mod => mod.id === right.attributes.module)
					: modules.length +
					  contentTypes.findIndex(mod => mod.id === right.attributes.subModule);
			const newAcc = [...acc];

			newAcc[moduleIndex] = {
				...allCategories[moduleIndex],
				type: right.attributes.type,
				securityRights: (acc[moduleIndex]?.securityRights || []).concat([right]),
			};

			return newAcc;
		}, modules as RoleSecurityRight[]);

		setSecurityRightsByModule(securityRightsByModuleResult);

		const initialStateResult = securityRights.reduce((acc, right) => {
			acc[right.id] = roles.reduce((roleIds, role) => {
				const hasSecurityRight = role.securityRights.find(rightId => rightId === right.id);
				if (hasSecurityRight) {
					roleIds.push(role.role.id);
				}
				return roleIds;
			}, [] as string[]);

			return acc;
		}, {} as FormState);

		setInitialFormstate(initialStateResult);

		const categoryResult: ModuleResponse[] = modules
			.map(mod => ({ ...mod, type: 'module' } as ModuleResponse))
			.concat(contentTypes.map(ct => ({ ...ct, type: 'content-type' })));

		setCategories(categoryResult);
	}, [securityRightMatrix]); // eslint-disable-line react-hooks/exhaustive-deps

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
		if (!securityRightsByModule || !initialFormstate) {
			return null;
		}

		return (
			<>
				<div className="row">
					<div className="col-xs-3">
						<ModulesList modules={categories} onClick={handleClick} />
					</div>
					<div className="col-xs-8 u-margin-left">
						<RolesPermissionsList
							readonly={
								!mySecurityRights.includes(
									SecurityRightsSite.RolesRightsUpdateRolePermissions
								)
							}
							roles={roles}
							permissions={securityRightsByModule}
							formState={initialFormstate}
							onChange={onFormChange}
							title={matrixTitle}
						/>
					</div>
				</div>
				<SecurableRender
					userSecurityRights={mySecurityRights}
					requiredSecurityRights={[SecurityRightsSite.RolesRightsUpdateRolePermissions]}
				>
					<ActionBar className="o-action-bar--fixed" isOpen>
						<ActionBarContentSection>
							<div className="u-wrapper row end-xs">
								<Button onClick={onCancel} negative>
									{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
								</Button>
								<Button
									iconLeft={
										updateLoadingState === LoadingState.Loading
											? 'circle-o-notch fa-spin'
											: null
									}
									disabled={updateLoadingState === LoadingState.Loading}
									className="u-margin-left-xs"
									onClick={onConfigSave}
									type="success"
								>
									{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
								</Button>
							</div>
						</ActionBarContentSection>
					</ActionBar>
				</SecurableRender>
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

export default RolesRightsOverview;
