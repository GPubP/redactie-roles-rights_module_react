import { AlertProps, alertService as utilsAlertService } from '@redactie/utils';

const alertService = (
	alertProps: AlertProps,
	containerId: string,
	type: 'success' | 'error'
): void => {
	const alertType = type === 'error' ? 'danger' : type;
	const alertOptions = { containerId };

	utilsAlertService[alertType](alertProps, alertOptions);
};

export default alertService;
