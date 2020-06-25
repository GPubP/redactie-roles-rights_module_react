import { object, string } from 'yup';

export const ROLE_DETAIL_VALIDATION_SCHEMA = object().shape({
	name: string().required(),
	description: string().required(),
});
