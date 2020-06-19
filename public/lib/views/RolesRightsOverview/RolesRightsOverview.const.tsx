export const fakeApi = {
	modules: [
		{
			id: 'cd801733-5b18-4270-bd5d-dc7d4b3e8c77',
			name: 'Sites BSL',
		},
	],
	securityRights: [
		{
			applicationDisplayName: 'int-district01.cms.v1-WCM',
			applicationId: 'bb6a719f-c782-4483-be77-24aa17eddd33',
			applicationName: 'int-district01.cms.v1-WCM',
			attributes: {
				level: 'site',
				module: 'cd801733-5b18-4270-bd5d-dc7d4b3e8c77',
				site: 'd8e453a9-b52a-428c-84af-2fcf504a56d4',
				tenant: 'd8e453a9-b52a-428c-84af-2fcf504a56d4',
				type: 'module',
			},
			description: 'Has permession to create sites',
			environment: 'TEST',
			id: 'int-district01.cms.v1-wcm-create-site-test-8d67ffb',
			name: 'create-site-TEST',
			neededTrustLevel: 1,
		},
		{
			applicationDisplayName: 'int-district01.cms.v1-WCM',
			applicationId: 'bb6a719f-c782-4483-be77-24aa17eddd33',
			applicationName: 'int-district01.cms.v1-WCM',
			attributes: {
				level: 'site',
				module: 'cd801733-5b18-4270-bd5d-dc7d4b3e8c77',
				site: 'd8e453a9-b52a-428c-84af-2fcf504a56d4',
				tenant: 'd8e453a9-b52a-428c-84af-2fcf504a56d4',
				type: 'module',
			},
			description: 'Has permession to create sites',
			environment: 'DEV',
			id: 'int-district01.cms.v1-wcm-create-site-dev-cfcc847',
			name: 'create-site-DEV',
			neededTrustLevel: 1,
		},
	],
	roles: [
		{
			role: {
				attributes: {
					CRUD: 'test',
					DOMEIN: null,
					LOCATIE: null,
					STADSBEDRIJF: null,
				},
				description: 'Beheerder van een site binnen een tenant',
				id: 'e4d70381-6dea-4718-8e39-c711169c8147',
				name: 'Sitebeheerder',
				validFrom: null,
				validTo: null,
			},
			securityRights: ['int-district01.cms.v1-wcm-create-site-dev-cfcc847'],
		},
		{
			role: {
				attributes: {
					CRUD: 'test',
					DOMEIN: null,
					LOCATIE: null,
					STADSBEDRIJF: null,
				},
				description: 'Redacteur die de inhoudelijke leiding heeft',
				id: '1b5741f2-a43e-4474-98c1-d6a2e49e3008',
				name: 'Hoofdredacteur',
				validFrom: null,
				validTo: null,
			},
			securityRights: [],
		},
		{
			role: {
				attributes: {
					CRUD: 'test',
					DOMEIN: null,
					LOCATIE: null,
					STADSBEDRIJF: null,
				},
				description: 'Redacteur die de inhoud controleert',
				id: '8b0d4c40-175c-48e3-964e-83573195fde5',
				name: 'Eindredacteur',
				validFrom: null,
				validTo: null,
			},
			securityRights: [],
		},
		{
			role: {
				attributes: {
					CRUD: 'test',
					DOMEIN: null,
					LOCATIE: null,
					STADSBEDRIJF: null,
				},
				description: 'Persoon die de inhoud schrijft',
				id: '4d1089d7-d945-40b4-a64b-146db22b844a',
				name: 'Redacteur',
				validFrom: null,
				validTo: null,
			},
			securityRights: [
				'int-district01.cms.v1-wcm-create-site-dev-cfcc847',
				'int-district01.cms.v1-wcm-create-site-test-8d67ffb',
			],
		},
	],
};
