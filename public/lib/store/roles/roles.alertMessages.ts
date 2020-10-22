import { AlertProps } from '@redactie/utils';

export type AlertMessages = Record<'update', { [key in 'success' | 'error']: AlertProps }>;

export const getAlertMessages = (name: string): AlertMessages => ({
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
