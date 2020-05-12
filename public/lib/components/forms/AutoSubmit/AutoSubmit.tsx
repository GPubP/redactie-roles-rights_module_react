import { FC, useEffect } from 'react';

import { AutoSubmitProps } from './AutoSubmit.types';

const AutoSubmit: FC<AutoSubmitProps> = ({ initialValues, values, submitForm }) => {
	useEffect(() => {
		if (initialValues !== values) {
			submitForm();
		}
	}, [values, submitForm, initialValues]);

	return null;
};

export default AutoSubmit;
