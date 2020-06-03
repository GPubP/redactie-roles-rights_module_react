import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataLoader, FormViewUserRoles } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { mapUserRoles } from '../../helpers';
import {
	useNavigate,
	useRoutesBreadcrumbs,
	useSite,
	useSiteRoles,
	useUser,
	useUserRolesForSite,
	useUsersLoadingStates,
} from '../../hooks';
import { MODULE_PATHS } from '../../roles.const';
import { LoadingState, RolesRouteProps } from '../../roles.types';
import { rolesFacade } from '../../store/roles';
import { sitesFacade } from '../../store/sites';
import { usersFacade } from '../../store/users';

const UserDetailRolesUpdate: FC<RolesRouteProps<{ userUuid?: string; siteUuid?: string }>> = () => {
	/**
	 * Hooks
	 */
	const { userUuid, siteUuid } = useParams();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = useCoreTranslation();
	const [userLoadingState, user] = useUser(userUuid);
	const { navigate, generatePath } = useNavigate();
	const extraBreadcrumbs = useMemo(() => {
		return [
			{
				name: user ? `${user.firstname} ${user.lastname}` : '...',
				target: generatePath(MODULE_PATHS.tenantUserDetail, {
					userUuid,
				}),
			},
			// The last breadcrumb will be removed so we need to set a dummy
			// breadcrumb to make sure that the user breadcrumb is visible
			{
				name: 'last',
				target: '',
			},
		];
	}, [user, generatePath, userUuid]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const { isUpdating } = useUsersLoadingStates();
	const [rolesLoadingState, roles] = useSiteRoles();
	const [siteLoadingState, site] = useSite();
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();
	const [selectedRoles, updateSelectedRoles] = useState<string[] | null>(null);

	useEffect(() => {
		if (userUuid && siteUuid) {
			usersFacade.getUserRolesForSite({
				userUuid,
				siteUuid,
			});
			usersFacade.getUser({ userUuid });
			rolesFacade.getSiteRoles(siteUuid);
			sitesFacade.getSite({ id: siteUuid });
		}
	}, [userUuid, siteUuid]);

	useEffect(() => {
		if (
			userLoadingState !== LoadingState.Loading &&
			userRolesLoadingState !== LoadingState.Loading &&
			rolesLoadingState !== LoadingState.Loading &&
			siteLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [rolesLoadingState, userLoadingState, siteLoadingState, userRolesLoadingState]);

	useEffect(() => {
		if (userRoles) {
			updateSelectedRoles(mapUserRoles(userRoles));
		}
	}, [userRoles]);

	/**
	 * Methods
	 */
	const handleSubmit = (): void => {
		if (selectedRoles && userRoles && mapUserRoles(userRoles) !== selectedRoles) {
			usersFacade
				.updateUserRolesForSite({
					userUuid,
					siteUuid,
					roles: selectedRoles,
				})
				.then(() =>
					navigate(MODULE_PATHS.tenantUserDetailRoles, {
						userUuid,
					})
				);
		}
	};

	const onFormChange = (updatesRoles: string[]): void => {
		updateSelectedRoles(updatesRoles);
	};

	const onCancel = (): void => {
		navigate(MODULE_PATHS.tenantUserDetailRoles, {
			userUuid,
		});
	};

	/**
	 * Render
	 */
	const renderSiteRolesForm = (): ReactElement | null => {
		if (!roles || !selectedRoles) {
			return null;
		}

		return (
			<>
				<h3>Rollen</h3>
				<div className="u-margin-top">
					<FormViewUserRoles
						readonly={false}
						formState={selectedRoles}
						availableRoles={roles}
						onSubmit={onFormChange}
					/>
				</div>
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<div className="u-wrapper row end-xs">
							<Button onClick={onCancel} negative>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
							<Button
								iconLeft={
									isUpdating === LoadingState.Loading
										? 'circle-o-notch fa-spin'
										: null
								}
								disabled={isUpdating === LoadingState.Loading}
								className="u-margin-left-xs"
								onClick={handleSubmit}
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
			<ContextHeader title={site ? site.data.name : ''}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm}></DataLoader>
			</Container>
		</>
	);
};

export default UserDetailRolesUpdate;
