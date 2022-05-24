# Class: MySecurityRightsQuery

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).MySecurityRightsQuery

## Hierarchy

- `Query`<[`MySecurityRightsState`](../wiki/index.MySecurityRightsState)\>

  ↳ **`MySecurityRightsQuery`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#constructor)

### Properties

- [data$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#data$)
- [error$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#error$)
- [isFetchingSiteRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#isfetchingsiterights$)
- [isFetchingTenantRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#isfetchingtenantrights$)
- [store](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#store)
- [tenantRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#tenantrights$)

### Methods

- [getIsFetchingSiteRights](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#getisfetchingsiterights)
- [getIsFetchingTenantRights](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#getisfetchingtenantrights)
- [getSiteRightsCacheSiteUuid](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#getsiterightscachesiteuuid)
- [getSiteRightsHasCache](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#getsiterightshascache)
- [getTenantRightsHasCache](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#gettenantrightshascache)
- [selectSiteRightsByModule](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#selectsiterightsbymodule)
- [siteRights$](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery#siterights$)

## Constructors

### constructor

• **new MySecurityRightsQuery**(`store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`MySecurityRightsStore`](../wiki/index.%3Cinternal%3E.MySecurityRightsStore) |

#### Overrides

Query&lt;MySecurityRightsState\&gt;.constructor

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:12

## Properties

### data$

• **data$**: `Observable`<{ `siteRights`: ``null`` \| [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[] ; `tenantRights`: ``null`` \| [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]  }\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:25

___

### error$

• **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:42

___

### isFetchingSiteRights$

• **isFetchingSiteRights$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:46

___

### isFetchingTenantRights$

• **isFetchingTenantRights$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:43

___

### store

• `Protected` **store**: [`MySecurityRightsStore`](../wiki/index.%3Cinternal%3E.MySecurityRightsStore)

#### Inherited from

Query.store

___

### tenantRights$

• **tenantRights$**: `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:26

## Methods

### getIsFetchingSiteRights

▸ **getIsFetchingSiteRights**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:55

___

### getIsFetchingTenantRights

▸ **getIsFetchingTenantRights**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:50

___

### getSiteRightsCacheSiteUuid

▸ **getSiteRightsCacheSiteUuid**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:68

___

### getSiteRightsHasCache

▸ **getSiteRightsHasCache**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:64

___

### getTenantRightsHasCache

▸ **getTenantRightsHasCache**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:60

___

### selectSiteRightsByModule

▸ **selectSiteRightsByModule**(`siteUuid`, `module`): `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `module` | `string` |

#### Returns

`Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:72

___

### siteRights$

▸ **siteRights$**(`siteUuid`): `Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |

#### Returns

`Observable`<[`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[]\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.query.ts:31
