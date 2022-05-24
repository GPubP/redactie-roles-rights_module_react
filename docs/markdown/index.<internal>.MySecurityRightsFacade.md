# Class: MySecurityRightsFacade

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).MySecurityRightsFacade

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#constructor)

### Properties

- [data$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#data$)
- [error$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#error$)
- [isFetchingSiteRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#isfetchingsiterights$)
- [isFetchingTenantRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#isfetchingtenantrights$)
- [siteRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#siterights$)
- [tenantRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#tenantrights$)

### Methods

- [getMySecurityRights](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#getmysecurityrights)
- [getMySiteSecurityRights](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#getmysitesecurityrights)
- [getMyTenantSecurityRights](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#getmytenantsecurityrights)
- [invalidateCache](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#invalidatecache)
- [selectSiteRightsByModule](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade#selectsiterightsbymodule)

## Constructors

### constructor

• **new MySecurityRightsFacade**(`store`, `service`, `query`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`MySecurityRightsStore`](../wiki/index.%3Cinternal%3E.MySecurityRightsStore) |
| `service` | [`UsersApiService`](../wiki/index.%3Cinternal%3E.UsersApiService) |
| `query` | [`MySecurityRightsQuery`](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery) |

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:10

## Properties

### data$

• `Readonly` **data$**: `Observable`<{ `siteRights`: ``null`` \| [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[] ; `tenantRights`: ``null`` \| [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]  }\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:16

___

### error$

• `Readonly` **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:20

___

### isFetchingSiteRights$

• `Readonly` **isFetchingSiteRights$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:22

___

### isFetchingTenantRights$

• `Readonly` **isFetchingTenantRights$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:21

___

### siteRights$

• `Readonly` **siteRights$**: (`siteUuid`: `string`) => `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Type declaration

▸ (`siteUuid`): `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |

##### Returns

`Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:18

___

### tenantRights$

• `Readonly` **tenantRights$**: `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:17

## Methods

### getMySecurityRights

▸ **getMySecurityRights**(`siteUuid?`, `clearCache?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `siteUuid?` | `string` | `undefined` |
| `clearCache` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:108

___

### getMySiteSecurityRights

▸ **getMySiteSecurityRights**(`siteUuid`, `clearCache?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `siteUuid` | `string` | `undefined` |
| `clearCache` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:72

___

### getMyTenantSecurityRights

▸ **getMyTenantSecurityRights**(`clearCache?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `clearCache` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:34

___

### invalidateCache

▸ **invalidateCache**(): `void`

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:67

___

### selectSiteRightsByModule

▸ **selectSiteRightsByModule**(`siteUuid`, `module?`): `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `module?` | `string` |

#### Returns

`Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.facade.ts:24
