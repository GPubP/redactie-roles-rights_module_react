# Class: SecurityRightsMatrixFacade

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).SecurityRightsMatrixFacade

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#constructor)

### Properties

- [data$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#data$)
- [error$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#error$)
- [isFetching$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#isfetching$)
- [isUpdating$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#isupdating$)

### Methods

- [getSecurityRightsBySite](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#getsecurityrightsbysite)
- [updateSecurityRightsForSite](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#updatesecurityrightsforsite)
- [updateSecurityRightsForSiteByCompartment](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade#updatesecurityrightsforsitebycompartment)

## Constructors

### constructor

• **new SecurityRightsMatrixFacade**(`mySecurityRightsFacade`, `store`, `service`, `query`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mySecurityRightsFacade` | [`MySecurityRightsFacade`](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade) |
| `store` | [`SecurityRightsMatrixStore`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixStore) |
| `service` | [`SecurityRightsApiService`](../wiki/index.%3Cinternal%3E.SecurityRightsApiService) |
| `query` | [`SecurityRightsMatrixQuery`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery) |

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:17

## Properties

### data$

• `Readonly` **data$**: `Observable`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:24

___

### error$

• `Readonly` **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:26

___

### isFetching$

• `Readonly` **isFetching$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:27

___

### isUpdating$

• `Readonly` **isUpdating$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:28

## Methods

### getSecurityRightsBySite

▸ **getSecurityRightsBySite**(`payload`, `siteId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `SearchParams` |
| `siteId` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:30

___

### updateSecurityRightsForSite

▸ **updateSecurityRightsForSite**(`payload`, `siteId`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`UpdateRolesMatrixPayload`](../wiki/index.%3Cinternal%3E#updaterolesmatrixpayload) | `undefined` |
| `siteId` | `string` | `undefined` |
| `options` | `Object` | `undefined` |
| `options.containerId` | [`ALERT_CONTAINER_IDS`](../wiki/index.%3Cinternal%3E.ALERT_CONTAINER_IDS) | `ALERT_CONTAINER_IDS.UPDATE_SECURITY_RIGHTS_ON_SITE` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:46

___

### updateSecurityRightsForSiteByCompartment

▸ **updateSecurityRightsForSiteByCompartment**(`payload`, `siteId`, `compartment`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`UpdateRolesMatrixPayload`](../wiki/index.%3Cinternal%3E#updaterolesmatrixpayload) | `undefined` |
| `siteId` | `string` | `undefined` |
| `compartment` | [`SelectedCompartment`](../wiki/index.%3Cinternal%3E.SelectedCompartment) & { `name`: `string`  } | `undefined` |
| `options` | `Object` | `undefined` |
| `options.containerId` | [`ALERT_CONTAINER_IDS`](../wiki/index.%3Cinternal%3E.ALERT_CONTAINER_IDS) | `ALERT_CONTAINER_IDS.UPDATE_SECURITY_RIGHTS_ON_SITE` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.facade.ts:77
