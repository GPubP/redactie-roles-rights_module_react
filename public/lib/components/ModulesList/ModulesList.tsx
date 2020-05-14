import { Card, CardHeader } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { Module, ModulesListProps } from './ModulesList.types';
import './ModulesList.scss';

const ModulesList: React.FC<ModulesListProps> = ({ modules }) => {
	return (
		<ul className="col-xs-12 col-sm-2">
			{modules.map((module: Module) => (
				<li key={module.id}>
					<Card>
						<CardHeader title={`${module.name}`} />
					</Card>
				</li>
			))}
		</ul>
	);
	// modules.map(module => (
	// 	<Card className="col-xs-12 col-sm-2">
	// 		<CardHeader title={module} />
	// 	</Card>
	// ))
};

export default ModulesList;
