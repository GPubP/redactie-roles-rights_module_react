import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import {
	DataLoader,
	LoadingState,
	useAPIQueryParams,
	useDetectValueChangesWorker,
} from '@redactie/utils';
import { FormikProps } from 'formik';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import { ModulesList, RolesPermissionsForm, RolesPermissionsFormState } from '../../components';
import { useMySecurityRightsForSite, useRoutesBreadcrumbs, useSecurityRights } from '../../hooks';
import { SecurityRightsSite, SITE_CONTEXT_DEFAULT_BREADCRUMBS } from '../../roles.const';
import { RolesRouteProps } from '../../roles.types';
import { ModuleResponse } from '../../services/securityRights';
import { securityRightsMatrixFacade } from '../../store/securityRightsMatrix';

import { ROLES_RIGHTS_QUERY_PARAMS_CONFIG } from './RolesRightsOverview.const';
import {
	parseRolesSecurityRightsMatrix,
	parseSecurityRightsByModule,
	parseSecurityRightsFormState,
	sortSecurityRightsMatrixRoles,
} from './RolesRightsOverview.helpers';
import { RoleSecurityRight } from './RolesRightsOverview.types';

const RolesRightsOverview: FC<RolesRouteProps<{ siteId: string }>> = ({ match }) => {
	const { siteId } = match.params;

	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs(SITE_CONTEXT_DEFAULT_BREADCRUMBS);
	const [query, setQuery] = useAPIQueryParams(ROLES_RIGHTS_QUERY_PARAMS_CONFIG, false);
	const [fetchLoadingState, updateLoadingState, securityRightMatrix] = useSecurityRights();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [securityRightsByModule, setSecurityRightsByModule] = useState<
		RoleSecurityRight[] | null
	>(null);
	const initialFormState = useRef<RolesPermissionsFormState | null>(null);
	const [formState, setFormState] = useState<RolesPermissionsFormState | null>(null);
	const [categories, setCategories] = useState<ModuleResponse[] | null>(null);
	const [selectedCompartment, setSelectedCompartment] = useState<{ type: string; id: string }>();
	const [matrixTitle, setMatrixTitle] = useState<string>('');
	const [mySecurityRightsLoadingState, mySecurityRights] = useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const sortedRoles = useMemo(() => sortSecurityRightsMatrixRoles(securityRightMatrix?.roles), [
		securityRightMatrix,
	]);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChangesWorker(
		initialLoading !== LoadingState.Loading &&
			updateLoadingState !== LoadingState.Loading &&
			!!formState,
		formState,
		BFF_MODULE_PUBLIC_PATH
	);
	const { modules = [], securityRights = [], roles = [], contentTypes = [] } =
		securityRightMatrix || {};

	// Fetch data when query changes
	useEffect(() => {
		// Reset change detection
		resetDetectValueChanges();
		// Set loading state and fetch data
		setInitialLoading(LoadingState.Loading);
		securityRightsMatrixFacade.getSecurityRightsBySite(query, siteId);
	}, [query, siteId]); // eslint-disable-line react-hooks/exhaustive-deps

	// Check loading state
	useEffect(() => {
		if (
			fetchLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading &&
			securityRightsByModule &&
			formState
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [fetchLoadingState, formState, mySecurityRightsLoadingState, securityRightsByModule]);

	// Parse security rights matrix data to form state
	useEffect(() => {
		const categoryResult: ModuleResponse[] = modules
			.map(mod => ({ ...mod, type: 'module' } as ModuleResponse))
			.concat(contentTypes.map(ct => ({ ...ct, type: 'content-type' })));

		setCategories(categoryResult);

		const securityRightsByModuleResult = parseSecurityRightsByModule(
			categoryResult,
			contentTypes,
			modules,
			securityRights
		);

		setSecurityRightsByModule(securityRightsByModuleResult);

		const initialStateResult = parseSecurityRightsFormState(securityRights, roles);

		if (!isEmpty(initialStateResult)) {
			initialFormState.current = initialStateResult;
			setFormState(initialStateResult);
		}
	}, [securityRightMatrix]); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Methods
	 */
	const onModuleListClick = (value: string, type: 'content-type' | 'module' | ''): void => {
		setQuery({
			module: type === 'module' ? value : undefined,
			'content-type': type === 'content-type' ? value : undefined,
		});

		setSelectedCompartment(!isEmpty(type) ? { type, id: value } : undefined);
		setMatrixTitle(value);
	};

	const onCancel = (resetForm: FormikProps<RolesPermissionsFormState>['resetForm']): void => {
		if (initialFormState.current) {
			resetForm({ values: initialFormState.current });
			setFormState(initialFormState.current);
		}
	};

	const onSave = (values: RolesPermissionsFormState): void => {
		const results = parseRolesSecurityRightsMatrix(values);
		const updateRolesMatrixData = securityRightMatrix?.roles.map(role => {
			const resultRoleId = results.find(r => r.roleId === role.role.id);
			if (resultRoleId) {
				return resultRoleId;
			}
			return { roleId: role.role.id, securityRights: [] };
		});

		if (!updateRolesMatrixData) {
			return;
		}

		if (!selectedCompartment) {
			securityRightsMatrixFacade
				.updateSecurityRightsForSite(updateRolesMatrixData, siteId)
				.then(() => resetDetectValueChanges());
			return;
		}

		securityRightsMatrixFacade
			.updateSecurityRightsForSiteByCompartment(
				updateRolesMatrixData,
				siteId,
				selectedCompartment.type,
				selectedCompartment.id
			)
			.then(() => resetDetectValueChanges());
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!securityRightsByModule || !formState) {
			return null;
		}

		return (
			<div className="row u-margin-top">
				<div className="col-xs-3">
					<ModulesList modules={categories} onClick={onModuleListClick} />
				</div>
				<div className="col-xs-8 u-margin-left">
					<RolesPermissionsForm
						title={matrixTitle}
						initialFormState={formState}
						readonly={
							!mySecurityRights.includes(
								SecurityRightsSite.RolesRightsUpdateRolePermissions
							)
						}
						roles={sortedRoles}
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
