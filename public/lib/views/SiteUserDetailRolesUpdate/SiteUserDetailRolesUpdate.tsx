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
import { generatePath, useParams } from 'react-router-dom';

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

const SiteUserDetailRolesUpdate: FC<RolesRouteProps> = ({ tenantId }) => {
	/**
	 * Hooks
	 */
	const { userUuid, siteId } = useParams();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = useCoreTranslation();
	const { navigate } = useNavigate();
	const { isUpdating } = useUsersLoadingStates();
	const [userLoadingState, user] = useUser(userUuid);
	const [rolesLoadingState, roles] = useSiteRoles();
	const [siteLoadingState, site] = useSite();
	const extraBreadcrumbs = useMemo(() => {
		return [
			{
				name: site ? site.data.name : '...',
				target: generatePath(`/${tenantId}/sites${MODULE_PATHS.siteRoot}`, {
					siteId,
				}),
			},
		];
	}, [site, siteId, tenantId]);
	const breadcrumbs = useRoutesBreadcrumbs(extraBreadcrumbs);
	const [userRolesLoadingState, userRoles] = useUserRolesForSite();
	const [selectedRoles, updateSelectedRoles] = useState<string[]>([]);

	useEffect(() => {
		if (userUuid && siteId) {
			usersFacade.getUserRolesForSite({
				userUuid,
				siteUuid: siteId,
			});
			usersFacade.getUser({ userUuid });
			rolesFacade.getSiteRoles(siteId);
			sitesFacade.getSite({ id: siteId });
		}
	}, [siteId, userUuid]);

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
	}, [rolesLoadingState, siteLoadingState, userLoadingState, userRolesLoadingState]);

	useEffect(() => {
		if (userRoles) {
			updateSelectedRoles(mapUserRoles(userRoles));
		}
	}, [userRoles]);

	/**
	 * Methods
	 */
	const handleSubmit = (): void => {
		if (userRoles && mapUserRoles(userRoles) !== selectedRoles) {
			usersFacade.updateUserRolesForSite({
				userUuid,
				siteUuid: siteId,
				roles: selectedRoles,
			});
		}
	};

	const onFormChange = (updatesRoles: string[]): void => {
		updateSelectedRoles(updatesRoles);
	};

	const onCancel = (): void => {
		navigate(`/sites${MODULE_PATHS.siteRoot}`, {
			siteId,
		});
	};

	/**
	 * Render
	 */
	const renderSiteRolesForm = (): ReactElement | null => {
		if (!roles) {
			return null;
		}
		return (
			<div className="u-margin-bottom-lg">
				<h3>Rollen</h3>
				<div className="u-margin-top">
					<FormViewUserRoles
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
			</div>
		);
	};

	return (
		<>
			<ContextHeader title={user ? `${user?.firstname} ${user?.lastname}` : ''}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderSiteRolesForm}></DataLoader>
			</Container>
		</>
	);
};

export default SiteUserDetailRolesUpdate;
