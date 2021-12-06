import { AlertMessages } from '../../roles.types';

export const getAlertMessages = (name: string): AlertMessages<'update'> => ({
	update: {
		success: {
			title: 'Bewaard',
			message: `Je hebt de rollen voor ${name} succesvol gewijzigd.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de rollen voor ${name} is mislukt.`,
		},
	},
});
