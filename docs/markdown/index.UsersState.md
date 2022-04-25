# Interface: UsersState

[index](../wiki/index).UsersState

## Hierarchy

- `BaseEntityState`<[`UserModel`](../wiki/index#usermodel-1), `string`\>

  ↳ **`UsersState`**

## Table of contents

### Properties

- [entities](../wiki/index.UsersState#entities-1)
- [error](../wiki/index.UsersState#error-1)
- [ids](../wiki/index.UsersState#ids-1)
- [isAddingUserToSite](../wiki/index.UsersState#isaddingusertosite-1)
- [isCreating](../wiki/index.UsersState#iscreating-1)
- [isFetching](../wiki/index.UsersState#isfetching-1)
- [isFetchingOne](../wiki/index.UsersState#isfetchingone-1)
- [isFetchingUserRolesForTenant](../wiki/index.UsersState#isfetchinguserrolesfortenant-1)
- [isUpdating](../wiki/index.UsersState#isupdating-1)
- [loading](../wiki/index.UsersState#loading-1)
- [meta](../wiki/index.UsersState#meta-1)
- [userDetail](../wiki/index.UsersState#userdetail-1)

## Properties

### entities

• `Optional` **entities**: `HashMap`<`UserResponse`\>

#### Inherited from

BaseEntityState.entities

#### Defined in

node_modules/@datorama/akita/lib/types.d.ts:7

___

### error

• `Optional` **error**: `any`

#### Inherited from

BaseEntityState.error

#### Defined in

node_modules/@datorama/akita/lib/types.d.ts:10

___

### ids

• `Optional` **ids**: `string`[]

#### Inherited from

BaseEntityState.ids

#### Defined in

node_modules/@datorama/akita/lib/types.d.ts:8

___

### isAddingUserToSite

• **isAddingUserToSite**: `boolean`

#### Defined in

public/lib/store/users/users.model.ts:17

___

### isCreating

• **isCreating**: `boolean`

#### Inherited from

BaseEntityState.isCreating

#### Defined in

node_modules/@redactie/utils/dist/store/baseEntity/baseEntity.state.d.ts:5

___

### isFetching

• **isFetching**: `boolean`

#### Inherited from

BaseEntityState.isFetching

#### Defined in

node_modules/@redactie/utils/dist/store/baseEntity/baseEntity.state.d.ts:3

___

### isFetchingOne

• **isFetchingOne**: `boolean`

#### Inherited from

BaseEntityState.isFetchingOne

#### Defined in

node_modules/@redactie/utils/dist/store/baseEntity/baseEntity.state.d.ts:4

___

### isFetchingUserRolesForTenant

• **isFetchingUserRolesForTenant**: `boolean`

#### Defined in

public/lib/store/users/users.model.ts:16

___

### isUpdating

• **isUpdating**: `boolean`

#### Inherited from

BaseEntityState.isUpdating

#### Defined in

node_modules/@redactie/utils/dist/store/baseEntity/baseEntity.state.d.ts:6

___

### loading

• `Optional` **loading**: `boolean`

#### Inherited from

BaseEntityState.loading

#### Defined in

node_modules/@datorama/akita/lib/types.d.ts:9

___

### meta

• `Optional` **meta**: `Page`

#### Defined in

public/lib/store/users/users.model.ts:14

___

### userDetail

• `Optional` **userDetail**: `UserDetailModel`

#### Defined in

public/lib/store/users/users.model.ts:15
