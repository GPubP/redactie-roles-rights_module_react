import React, { FC } from 'react';

import './ModulesList.scss';

import { ModulesListProps } from './ModulesList.types';

const ModulesList: FC<ModulesListProps> = ({ modules, onClick }) => {
	return (
		<ul className="m-nav-list">
			<li>
				<div onClick={() => onClick('')}>Alle permissies</div>
			</li>
			{modules?.map(({ name, id }, index) => (
				<li key={`nav-list-${index}`}>
					<div onClick={() => onClick(name)}>{name}</div>
				</li>
			))}
		</ul>
	);
};

export default ModulesList;
