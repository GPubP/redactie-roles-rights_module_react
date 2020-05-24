import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import './ModulesList.scss';

import { ModulesListProps } from './ModulesList.types';

const ModulesList: FC<ModulesListProps> = ({ modules, onClick }) => {
	return (
		<ul className="m-nav-list">
			<li>
				<Button onClick={() => onClick('')}>Alle permissies</Button>
			</li>
			{modules?.map(({ name, id }, index) => (
				<li key={`nav-list-${index}`}>
					<Button onClick={() => onClick(id)}>{name}</Button>
				</li>
			))}
		</ul>
	);
};

export default ModulesList;
