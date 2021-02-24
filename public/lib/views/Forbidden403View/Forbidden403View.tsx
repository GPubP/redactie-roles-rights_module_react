import { Button } from '@acpaas-ui/react-components';
import { parse } from 'query-string';
import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Forbidden403View: FC = () => {
	const location = useLocation();
	const history = useHistory();
	const searchParams = parse(location.search);

	const handleGoBack = (): void => {
		history.push(searchParams.redirect as string);
	};

	// TODO: translate the conent inside this component
	return (
		<>
			<div className="row u-margin-top-lg u-flex-justify-center">
				<div className="col-xs-12 col-md-6">
					<div className="u-text-center">
						<h1 className="u-margin-bottom">403</h1>
						<h2 className="h6 u-margin-bottom">Het spijt ons...</h2>
						<p className="u-margin-bottom">Je hebt geen toegang tot deze pagina.</p>
						{searchParams.redirect && (
							<Button onClick={handleGoBack} type="primary">
								Ga terug
							</Button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Forbidden403View;
