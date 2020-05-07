export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/gebruikers',
		'/:tenantId/gebruikers/overzicht',
		'/:tenantId/gebruikers/:userId',
		'/:tenantId/sites',
		'/:tenantId/sites/:siteId/gebruikers',
		'/:tenantId/sites/:siteId/gebruikers/users',
		'/:tenantId/sites/:siteId/gebruikers/users/:userId',
		'/:tenantId/sites/:siteId/gebruikers/roles',
	],
};

const root = '/gebruikers';

const rolesRoot = `${root}/roles`;
const usersRoot = `${root}`;

const rolesOverview = `${rolesRoot}/overzicht`;
const usersOverview = `${usersRoot}/overzicht`;

const userDetail = `${usersRoot}/:userUuid`;
const userDetailGeneral = `${userDetail}/algemeen`;

export const MODULE_PATHS = {
	root,
	users: {
		root: usersRoot,
		overview: usersOverview,
		detail: userDetail,
		detailGeneral: userDetailGeneral,
	},
};

export const MODULE_PATHS_SITE = {
	root: `/:siteId${root}`,
	users: {
		root: `/:siteId${usersRoot}`,
		overview: `/:siteId${usersOverview}`,
		detail: `/:siteId${userDetail}`,
		detailGeneral: `/:siteId${userDetailGeneral}`,
	},
	roles: {
		root: `/:siteId${rolesRoot}`,
		overview: `/:siteId${rolesOverview}`,
	},
};
