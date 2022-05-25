# Class: SecurityRightsApiService

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).SecurityRightsApiService

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.SecurityRightsApiService#constructor)

### Methods

- [getRolesBySite](../wiki/index.%3Cinternal%3E.SecurityRightsApiService#getrolesbysite)
- [updateSecurityRightsForSite](../wiki/index.%3Cinternal%3E.SecurityRightsApiService#updatesecurityrightsforsite)
- [updateSecurityRightsForSiteByCompartment](../wiki/index.%3Cinternal%3E.SecurityRightsApiService#updatesecurityrightsforsitebycompartment)

## Constructors

### constructor

• **new SecurityRightsApiService**()

## Methods

### getRolesBySite

▸ **getRolesBySite**(`searchParams?`, `siteId`): `Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_SECURITYRIGHTS_SEARCH_PARAMS` |
| `siteId` | `string` | `undefined` |

#### Returns

`Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Defined in

public/lib/services/securityRights/securityRights.service.ts:13

___

### updateSecurityRightsForSite

▸ **updateSecurityRightsForSite**(`siteId`, `roles`): `Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `roles` | [`UpdateRolesMatrixPayload`](../wiki/index.%3Cinternal%3E#updaterolesmatrixpayload) |

#### Returns

`Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Defined in

public/lib/services/securityRights/securityRights.service.ts:24

___

### updateSecurityRightsForSiteByCompartment

▸ **updateSecurityRightsForSiteByCompartment**(`siteId`, `roles`, `type`, `id`): `Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `roles` | [`UpdateRolesMatrixPayload`](../wiki/index.%3Cinternal%3E#updaterolesmatrixpayload) |
| `type` | `string` |
| `id` | `string` |

#### Returns

`Promise`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Defined in

public/lib/services/securityRights/securityRights.service.ts:37
