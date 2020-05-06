import { FilterFormState } from '../../roles.types';

export interface FilterFormProps {
	initialState: FilterFormState;
	onCancel: () => void;
	onSubmit: (values: FilterFormState) => void;
	deleteActiveFilter: (item: any) => void;
	activeFilters: Array<object>;
}
