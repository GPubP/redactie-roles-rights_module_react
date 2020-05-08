import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Table } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { DUMMY_SITES, SITE_COLUMNS, SITE_VALIDATION_SCHEMA } from './UserDetailRoles.const';
import { UserDetailRolesProps } from './UserDetailRoles.types';

const UserDetailRoles: FC<UserDetailRolesProps> = ({ user }) => {
	/**
	 * Render
	 */
	const renderTableField = ({ value: fields }: { value: any[] }): ReactElement => {
		const siteRows: any[] = (fields || []).map(site => ({
			name: site.name,
			roles: site.roles,
			path: '#',
			setActiveField: () => console.log(site),
			editAccess: () => console.log(site),
		}));

		return (
			<Table
				className="u-margin-top"
				columns={SITE_COLUMNS()}
				rows={siteRows}
				totalValues={DUMMY_SITES.length}
			/>
		);
	};

	const renderTableForm = (): ReactElement => {
		return (
			<Formik
				initialValues={{ fields: DUMMY_SITES }}
				onSubmit={() => console.log('submit form')}
				validationSchema={SITE_VALIDATION_SCHEMA}
			>
				{() => <Field name="fields" placeholder="No fields" as={renderTableField} />}
			</Formik>
		);
	};

	return (
		<Card>
			<div className="u-margin">
				<h5>Rollen</h5>
				{renderTableForm()}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<div className="u-wrapper">
							<Button
								className="u-margin-right-xs"
								onClick={() => console.log('save')}
								type="success"
							>
								Bewaar
							</Button>
							<Button onClick={() => console.log('cancel')} outline>
								Annuleer
							</Button>
						</div>
					</ActionBarContentSection>
				</ActionBar>
			</div>
		</Card>
	);
};

export default UserDetailRoles;
