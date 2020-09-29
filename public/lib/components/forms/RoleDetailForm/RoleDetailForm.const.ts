import { object, string } from 'yup';

export const ROLE_DETAIL_VALIDATION_SCHEMA = object().shape({
	name: string().required('Naam is verplicht'),
	description: string().required('Beschrijving is verplicht'),
});
