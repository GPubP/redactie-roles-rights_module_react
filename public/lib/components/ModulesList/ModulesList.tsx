import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ModulesListProps } from './ModulesList.types';

const ModulesList: FC<ModulesListProps> = ({ modules }) => {
	return (
		<ul className="m-nav-list">
			<li>
				<NavLink activeClassName="is-active" to="Alle permissies">
					Alle permissies
				</NavLink>
			</li>
			{modules.map(({ name }, index) => (
				<li key={`nav-list-${index}`}>
					<NavLink activeClassName="is-active" to={name}>
						{name}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default ModulesList;
