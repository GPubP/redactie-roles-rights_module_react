import { AlertMessages } from '../../roles.types';

export const getAlertMessages = (name: string): AlertMessages<'update'> => ({
	update: {
		success: {
			title: 'Bewaard',
			message: `U hebt de rol ${name} succesvol gewijzigd.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de rol ${name} is mislukt.`,
		},
	},
});
