# Class: RolesStore

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).RolesStore

## Hierarchy

- `Store`<[`RolesState`](../wiki/index.RolesState)\>

  ↳ **`RolesStore`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.RolesStore#constructor)

### Methods

- [setIsCreating](../wiki/index.%3Cinternal%3E.RolesStore#setiscreating)
- [setIsDeleting](../wiki/index.%3Cinternal%3E.RolesStore#setisdeleting)
- [setIsFetching](../wiki/index.%3Cinternal%3E.RolesStore#setisfetching)
- [setIsUpdating](../wiki/index.%3Cinternal%3E.RolesStore#setisupdating)
- [setRoleDetail](../wiki/index.%3Cinternal%3E.RolesStore#setroledetail)
- [setRoles](../wiki/index.%3Cinternal%3E.RolesStore#setroles)

## Constructors

### constructor

• **new RolesStore**()

#### Overrides

Store&lt;RolesState\&gt;.constructor

#### Defined in

public/lib/store/roles/roles.store.ts:13

## Methods

### setIsCreating

▸ **setIsCreating**(`type`, `isCreating?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) | `undefined` |
| `isCreating` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:37

___

### setIsDeleting

▸ **setIsDeleting**(`type`, `isDeleting?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) | `undefined` |
| `isDeleting` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:47

___

### setIsFetching

▸ **setIsFetching**(`type`, `isFetching?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) | `undefined` |
| `isFetching` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:17

___

### setIsUpdating

▸ **setIsUpdating**(`type`, `isUpdating?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) | `undefined` |
| `isUpdating` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:27

___

### setRoleDetail

▸ **setRoleDetail**(`type`, `roleDetail`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |
| `roleDetail` | `undefined` \| `Partial`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\> |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:67

___

### setRoles

▸ **setRoles**(`type`, `entityState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |
| `entityState` | `Partial`<[`RoleEntityState`](../wiki/index.%3Cinternal%3E.RoleEntityState)\> |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.store.ts:57
