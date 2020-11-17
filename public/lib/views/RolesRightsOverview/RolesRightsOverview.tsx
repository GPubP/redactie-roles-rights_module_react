import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { DataLoader, LoadingState, useDetectValueChanges } from '@redactie/utils';
import { FormikProps } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { ModulesList, RolesPermissionsForm, RolesPermissionsFormState } from '../../components';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useSecurityRights } from '../../hooks';
import { SecurityRightsSite } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { DEFAULT_ROLES_SEARCH_PARAMS } from '../../services/roles/roles.service.const';
import { ModuleResponse, UpdateRolesMatrixPayload } from '../../services/securityRights';
import { securityRightsMatrixFacade } from '../../store/securityRightsMatrix';

import { RoleSecurityRight } from './RolesRightsOverview.types';

const RolesRightsOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;

	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Gebruikers',
			target: '',
		},
	]);
	const [rolesSearchParams, setRolesSearchParams] = useState(DEFAULT_ROLES_SEARCH_PARAMS);
	const [fetchLoadingState, updateLoadingState, securityRightMatrix] = useSecurityRights();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [securityRightsByModule, setSecurityRightsByModule] = useState<
		RoleSecurityRight[] | null
	>(null);
	const [initialFormState, setInitialFormState] = useState<RolesPermissionsFormState | null>(
		null
	);
	const [formState, setFormState] = useState<RolesPermissionsFormState | null>(null);
	const [categories, setCategories] = useState<ModuleResponse[] | null>(null);
	const { modules = [], securityRights = [], roles = [], contentTypes = [] } =
		securityRightMatrix || {};
	const [matrixTitle, setMatrixTitle] = useState<string>('');
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(
		initialLoading !== LoadingState.Loading && updateLoadingState !== LoadingState.Loading,
		formState ?? initialFormState
	);

	useEffect(() => {
		setInitialLoading(LoadingState.Loading);
		securityRightsMatrixFacade.getSecurityRightsBySite(rolesSearchParams, siteId);
	}, [rolesSearchParams, siteId]);

	useEffect(() => {
		if (
			fetchLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading &&
			securityRightsByModule &&
			initialFormState
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [initialFormState, fetchLoadingState, mySecurityRightsLoadingState, securityRightsByModule]);

	useEffect(() => {
		const categoryResult: ModuleResponse[] = modules
			.map(mod => ({ ...mod, type: 'module' } as ModuleResponse))
			.concat(contentTypes.map(ct => ({ ...ct, type: 'content-type' })));

		setCategories(categoryResult);

		const securityRightsByModuleResult = securityRights.reduce((acc, right) => {
			const newAcc = [...acc];
			const moduleIndex =
				right.attributes.type !== 'content-type'
					? modules.findIndex(mod => mod.id === right.attributes.module)
					: modules.length +
					  contentTypes.findIndex(mod => mod.id === right.attributes.subModule);

			newAcc[moduleIndex] = {
				...categoryResult[moduleIndex],
				type: right.attributes.type,
				securityRights: (acc[moduleIndex]?.securityRights || []).concat([right]),
			};

			return newAcc;
		}, categoryResult as RoleSecurityRight[]);

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
		}, {} as RolesPermissionsFormState);

		setInitialFormState(initialStateResult);
	}, [securityRightMatrix]); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Methods
	 */
	const handleClick = (value: string, type: 'content-type' | 'module' | ''): any => {
		setRolesSearchParams({
			...rolesSearchParams,
			module: type === 'module' ? value : '',
			'content-type': type === 'content-type' ? value : '',
		});

		setMatrixTitle(value);
	};

	const onCancel = (resetForm: FormikProps<RolesPermissionsFormState>['resetForm']): void => {
		resetForm();
	};

	const parseFormResult = (formState: RolesPermissionsFormState): UpdateRolesMatrixPayload =>
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

	const onSave = (values: RolesPermissionsFormState): void => {
		const results = parseFormResult(values);
		const updateRolesMatrixData = securityRightMatrix?.roles.map(role => {
			const resultRoleId = results.find(r => r.roleId === role.role.id);
			if (resultRoleId) {
				return resultRoleId;
			}
			return { roleId: role.role.id, securityRights: [] };
		});

		if (updateRolesMatrixData) {
			securityRightsMatrixFacade
				.updateSecurityRightsForSite(updateRolesMatrixData, siteId)
				.then(() => resetDetectValueChanges());
		}
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!securityRightsByModule || !initialFormState) {
			return null;
		}

		return (
			<>
				<div className="row">
					<div className="col-xs-3">
						<ModulesList modules={categories} onClick={handleClick} />
					</div>
					<div className="col-xs-8 u-margin-left">
						<RolesPermissionsForm
							title={matrixTitle}
							initialFormState={initialFormState}
							readonly={
								!mySecurityRights.includes(
									SecurityRightsSite.RolesRightsUpdateRolePermissions
								)
							}
							roles={roles}
							permissions={securityRightsByModule}
							mySecurityRights={mySecurityRights}
							isLoading={updateLoadingState === LoadingState.Loading}
							hasChanges={hasChanges}
							onChange={setFormState}
							onSubmit={onSave}
							onCancel={onCancel}
						/>
					</div>
				</div>
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
