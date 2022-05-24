# Class: UsersQuery

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).UsersQuery

## Hierarchy

- `BaseEntityQuery`<[`UsersState`](../wiki/index.UsersState)\>

  ↳ **`UsersQuery`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.UsersQuery#constructor)

### Properties

- [isAddingUserToSite$](../wiki/index.%3Cinternal%3E.UsersQuery#isaddingusertosite$)
- [isFetchingUserRolesForTenant$](../wiki/index.%3Cinternal%3E.UsersQuery#isfetchinguserrolesfortenant$)
- [meta$](../wiki/index.%3Cinternal%3E.UsersQuery#meta$)
- [user$](../wiki/index.%3Cinternal%3E.UsersQuery#user$)
- [userRolesForSite$](../wiki/index.%3Cinternal%3E.UsersQuery#userrolesforsite$)
- [userRolesForTenant$](../wiki/index.%3Cinternal%3E.UsersQuery#userrolesfortenant$)
- [users$](../wiki/index.%3Cinternal%3E.UsersQuery#users$)

## Constructors

### constructor

• **new UsersQuery**(`store`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `BaseEntityStore`<[`UsersState`](../wiki/index.UsersState), [`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse), `string`\> |
| `options?` | `QueryConfigOptions`<`any`\> |

#### Inherited from

BaseEntityQuery<UsersState\>.constructor

#### Defined in

node_modules/@redactie/utils/dist/store/baseEntity/baseEntity.query.d.ts:7

## Properties

### isAddingUserToSite$

• **isAddingUserToSite$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/users/users.query.ts:25

___

### isFetchingUserRolesForTenant$

• **isFetchingUserRolesForTenant$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/users/users.query.ts:21

___

### meta$

• **meta$**: `Observable`<`undefined` \| `Page`\>

#### Defined in

public/lib/store/users/users.query.ts:9

___

### user$

• **user$**: `Observable`<`undefined` \| [`UserDetailModel`](../wiki/index.%3Cinternal%3E.UserDetailModel)\>

#### Defined in

public/lib/store/users/users.query.ts:11

___

### userRolesForSite$

• **userRolesForSite$**: `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/users/users.query.ts:16

___

### userRolesForTenant$

• **userRolesForTenant$**: `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/users/users.query.ts:12

___

### users$

• **users$**: `Observable`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)[]\>

#### Defined in

public/lib/store/users/users.query.ts:10
