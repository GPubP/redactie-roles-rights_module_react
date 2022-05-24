# Class: UsersStore

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).UsersStore

## Hierarchy

- `BaseEntityStore`<[`UsersState`](../wiki/index.UsersState), [`UserModel`](../wiki/index#usermodel)\>

  ↳ **`UsersStore`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.UsersStore#constructor)

### Methods

- [setIsAddingUserToSite](../wiki/index.%3Cinternal%3E.UsersStore#setisaddingusertosite)
- [setIsFetchingUserRolesForTenant](../wiki/index.%3Cinternal%3E.UsersStore#setisfetchinguserrolesfortenant)
- [setUserDetail](../wiki/index.%3Cinternal%3E.UsersStore#setuserdetail)

## Constructors

### constructor

• **new UsersStore**(`initialState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `Partial`<[`UsersState`](../wiki/index.UsersState)\> |

#### Overrides

BaseEntityStore&lt;UsersState, UserModel\&gt;.constructor

#### Defined in

public/lib/store/users/users.store.ts:8

## Methods

### setIsAddingUserToSite

▸ **setIsAddingUserToSite**(`isAddingUserToSite?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isAddingUserToSite` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.store.ts:18

___

### setIsFetchingUserRolesForTenant

▸ **setIsFetchingUserRolesForTenant**(`isFetchingUserRolesForTenant?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isFetchingUserRolesForTenant` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.store.ts:12

___

### setUserDetail

▸ **setUserDetail**(`userDetail`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userDetail` | `undefined` \| `Partial`<[`UserDetailModel`](../wiki/index.%3Cinternal%3E.UserDetailModel)\> |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.store.ts:24
