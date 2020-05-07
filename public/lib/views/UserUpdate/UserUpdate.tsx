import { Card } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement } from 'react';
import { generatePath, Redirect, useParams } from 'react-router-dom';

import { DataLoader, NavList } from '../../components';
import { useRoutesBreadcrumbs } from '../../hooks';
import { LoadingState, RolesRouteProps } from '../../roles.types';

import { USER_UPDATE_NAV_LIST_ITEMS } from './UserUpdate.const';

const UserUpdate: FC<RolesRouteProps<{ userUuid?: string }>> = ({ route, match }) => {
	/**
	 * Hooks
	 */
	const breadcrumbs = useRoutesBreadcrumbs();
	const { siteId, userUuid } = useParams();

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		const uuidRegex =
			'\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b';

		// Redirect /gebruikers/:userUuid to /gebruikers/:userUuid/algemeen
		if (new RegExp(`/gebruikers/${uuidRegex}$`).test(location.pathname)) {
			return <Redirect to={`${match.url}/algemeen`} />;
		}

		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			routes: route.routes,
		});
	};

	return (
		<>
			<ContextHeader title="Voornaam Achternaam">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-3 u-margin-bottom">
						<Card>
							<NavList
								items={USER_UPDATE_NAV_LIST_ITEMS.map(listItem => ({
									...listItem,
									to: generatePath(`${route.path}/${listItem.to}`, {
										siteId,
										userUuid,
									}),
								}))}
							/>
						</Card>
					</div>
					<div className="col-xs-9">
						<DataLoader loadingState={LoadingState.Loaded} render={renderChildRoutes} />
					</div>
				</div>
			</Container>
		</>
	);
};

export default UserUpdate;
