import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { RolesRightsCompartmentType } from '../../roles.types';

import './ModulesList.scss';

import { ModulesListProps } from './ModulesList.types';

const ModulesList: FC<ModulesListProps> = ({ modules, onClick }) => {
	return (
		<ul className="m-nav-list">
			<li>
				<Button onClick={() => onClick('', '')}>Alle permissies</Button>
			</li>
			{modules?.map(({ name, id, type }, index) => (
				<li key={`nav-list-${index}`}>
					<Button onClick={() => onClick(id, (type as RolesRightsCompartmentType) || '')}>
						<label>{name}</label>
						<p aria-label={`type ${type}`} className="u-text-light">
							{type}
						</p>
					</Button>
				</li>
			))}
		</ul>
	);
};

export default ModulesList;
