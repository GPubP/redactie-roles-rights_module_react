import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './ModulesList.scss';
import { ModulesListProps } from './ModulesList.types';

const ModulesList: FC<ModulesListProps> = ({ modules }) => {
	return (
		<ul className="m-nav-list">
			<li>
				<NavLink activeClassName="is-active" to="">
					Alle permissies
				</NavLink>
			</li>
			{modules?.map(({ name, id }, index) => (
				<li key={`nav-list-${index}`}>
					<NavLink activeClassName="is-active" to={id}>
						{name}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default ModulesList;
