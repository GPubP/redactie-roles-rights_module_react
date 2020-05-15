import { ReactElement } from 'react';

import { LoadingState } from '../../roles.types';

export interface DataLoaderProps {
	errorMessage?: string;
	loadingState: LoadingState;
	notFoundMessage?: string;
	render: () => ReactElement | null;
}
