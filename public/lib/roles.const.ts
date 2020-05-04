export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/sites',
		'/:tenantId/sites/:siteId/content',
		'/:tenantId/sites/:siteId/content/content-type',
		'/:tenantId/sites/:siteId/content/content-type/:contentTypeId',
		'/:tenantId/sites/:siteId/content/:contentId',
	],
};

const root = '/:siteId';

const rolesRoot = `${root}/roles`;
const usersRoot = `${root}/users`;

const rolesOverview = `${rolesRoot}/overzicht`;
const usersOverview = `${usersRoot}/overzicht`;

export const MODULE_PATHS = {
	root,
	users: {
		root: usersRoot,
		overview: usersOverview,
	},
	roles: {
		root: rolesRoot,
		overview: rolesOverview,
	},
};
