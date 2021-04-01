const { getModuleConfig, getWorkerConfig } = require('@redactie/utils/dist/webpack');

const packageJSON = require('./package.json');

module.exports = env => {
	const defaultConfig = getModuleConfig({
		packageJSON,
		clean: true,
		externals: {
			'@redactie/translations-module': '@redactie/translations-module',
		},
	})(env);
	const workerConfig = getWorkerConfig();

	return [workerConfig, defaultConfig];
};
