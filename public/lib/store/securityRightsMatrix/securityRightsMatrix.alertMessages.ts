import { AlertMessages } from '../../roles.types';

export const getAlertMessages = (name?: string): AlertMessages<'update' | 'updateOne'> => ({
	update: {
		success: {
			title: 'Bewaard',
			message: 'De permissies zijn succesvol gewijzigd.',
		},
		error: {
			title: 'Bewaren mislukt',
			message: 'Bewaren van de permissies is mislukt.',
		},
	},
	updateOne: {
		success: {
			title: 'Bewaard',
			message: `De permissies voor ${name} zijn succesvol gewijzigd.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de permissies voor ${name} is mislukt.`,
		},
	},
});
