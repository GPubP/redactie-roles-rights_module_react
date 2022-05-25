# Class: RolesApiService

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).RolesApiService

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.RolesApiService#constructor)

### Methods

- [createSiteRole](../wiki/index.%3Cinternal%3E.RolesApiService#createsiterole)
- [deleteSiteRole](../wiki/index.%3Cinternal%3E.RolesApiService#deletesiterole)
- [getDefaultSiteRoles](../wiki/index.%3Cinternal%3E.RolesApiService#getdefaultsiteroles)
- [getSiteRole](../wiki/index.%3Cinternal%3E.RolesApiService#getsiterole)
- [getSiteRoles](../wiki/index.%3Cinternal%3E.RolesApiService#getsiteroles)
- [getTenantRoles](../wiki/index.%3Cinternal%3E.RolesApiService#gettenantroles)
- [updateSiteRole](../wiki/index.%3Cinternal%3E.RolesApiService#updatesiterole)

## Constructors

### constructor

• **new RolesApiService**()

## Methods

### createSiteRole

▸ **createSiteRole**(`__namedParameters`): `Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:31

___

### deleteSiteRole

▸ **deleteSiteRole**(`__namedParameters`): `Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:39

___

### getDefaultSiteRoles

▸ **getDefaultSiteRoles**(): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:12

___

### getSiteRole

▸ **getSiteRole**(`siteUuid`, `roleId`): `Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `roleId` | `string` |

#### Returns

`Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:27

___

### getSiteRoles

▸ **getSiteRoles**(`siteUuid`, `searchParams`): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `searchParams` | `SearchParams` |

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:16

___

### getTenantRoles

▸ **getTenantRoles**(): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:8

___

### updateSiteRole

▸ **updateSiteRole**(`__namedParameters`): `Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/services/roles/roles.service.ts:35
