import { AlertMessages } from '../../roles.types';

export const getAlertMessages = (name: string): AlertMessages<'update' | 'create' | 'remove'> => ({
	create: {
		success: {
			title: 'Bewaard',
			message: `Je hebt de rol ${name} succesvol aangemaakt.`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Aanmaken van de rol ${name} is mislukt.`,
		},
		errorDuplicate: {
			title: 'Aanmaken mislukt',
			message: `Aanmaken van de rol ${name} is mislukt. Er bestaat reeds een rol met deze naam.`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `Je hebt de rol ${name} succesvol gewijzigd.`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Bewaren van de rol ${name} is mislukt.`,
		},
	},
	remove: {
		success: {
			title: 'Verwijderd',
			message: `Je hebt de rol ${name} succesvol verwijderd.`,
		},
		error: {
			title: 'Verwijderen mislukt',
			message: `Verwijderen van de rol ${name} is mislukt.`,
		},
	},
});
