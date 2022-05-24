# Class: MySecurityRightsStore

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).MySecurityRightsStore

## Hierarchy

- `Store`<[`MySecurityRightsState`](../wiki/index.MySecurityRightsState)\>

  ↳ **`MySecurityRightsStore`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#constructor)

### Properties

- [siteRightsCache](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#siterightscache)
- [tenantRightsCache](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#tenantrightscache)

### Methods

- [setIsFetchingSiteRights](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#setisfetchingsiterights)
- [setIsFetchingTenantRights](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#setisfetchingtenantrights)
- [setSiteRights](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#setsiterights)
- [setSiteRightsCache](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#setsiterightscache)
- [setTenantRights](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#settenantrights)
- [setTenantRightsCache](../wiki/index.%3Cinternal%3E.MySecurityRightsStore#settenantrightscache)

## Constructors

### constructor

• **new MySecurityRightsStore**()

#### Overrides

Store&lt;MySecurityRightsState\&gt;.constructor

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:18

## Properties

### siteRightsCache

• **siteRightsCache**: [`SiteRightsCache`](../wiki/index.%3Cinternal%3E.SiteRightsCache)

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:14

___

### tenantRightsCache

• **tenantRightsCache**: `BehaviorSubject`<`boolean`\>

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:13

## Methods

### setIsFetchingSiteRights

▸ **setIsFetchingSiteRights**(`isFetching?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isFetching` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:39

___

### setIsFetchingTenantRights

▸ **setIsFetchingTenantRights**(`isFetching?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isFetching` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:33

___

### setSiteRights

▸ **setSiteRights**(`siteUuid`, `siteRights`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `siteRights` | [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[] |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:55

___

### setSiteRightsCache

▸ **setSiteRightsCache**(`hasCache`, `siteUuid?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hasCache` | `boolean` |
| `siteUuid?` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:28

___

### setTenantRights

▸ **setTenantRights**(`tenantRights`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantRights` | [`SecurityRightResponse`](../wiki/index.%3Cinternal%3E.SecurityRightResponse)[] |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:45

___

### setTenantRightsCache

▸ **setTenantRightsCache**(`hasCache`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hasCache` | `boolean` |

#### Returns

`void`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.store.ts:22
