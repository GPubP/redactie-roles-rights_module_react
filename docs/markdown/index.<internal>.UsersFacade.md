# Class: UsersFacade

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).UsersFacade

## Hierarchy

- `BaseEntityFacade`<[`UsersStore`](../wiki/index.%3Cinternal%3E.UsersStore), [`UsersApiService`](../wiki/index.%3Cinternal%3E.UsersApiService), [`UsersQuery`](../wiki/index.%3Cinternal%3E.UsersQuery)\>

  ↳ **`UsersFacade`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.UsersFacade#constructor)

### Properties

- [isAddingUserToSite$](../wiki/index.%3Cinternal%3E.UsersFacade#isaddingusertosite$)
- [isFetchingUserRolesForTenant$](../wiki/index.%3Cinternal%3E.UsersFacade#isfetchinguserrolesfortenant$)
- [meta$](../wiki/index.%3Cinternal%3E.UsersFacade#meta$)
- [query](../wiki/index.%3Cinternal%3E.UsersFacade#query)
- [service](../wiki/index.%3Cinternal%3E.UsersFacade#service)
- [store](../wiki/index.%3Cinternal%3E.UsersFacade#store)
- [user$](../wiki/index.%3Cinternal%3E.UsersFacade#user$)
- [userRolesForSite$](../wiki/index.%3Cinternal%3E.UsersFacade#userrolesforsite$)
- [userRolesForTenant$](../wiki/index.%3Cinternal%3E.UsersFacade#userrolesfortenant$)
- [users$](../wiki/index.%3Cinternal%3E.UsersFacade#users$)

### Methods

- [addUserToSite](../wiki/index.%3Cinternal%3E.UsersFacade#addusertosite)
- [clearUser](../wiki/index.%3Cinternal%3E.UsersFacade#clearuser)
- [getTenantUserBySite](../wiki/index.%3Cinternal%3E.UsersFacade#gettenantuserbysite)
- [getTenantUsersBySite](../wiki/index.%3Cinternal%3E.UsersFacade#gettenantusersbysite)
- [getUser](../wiki/index.%3Cinternal%3E.UsersFacade#getuser)
- [getUserRolesForSite](../wiki/index.%3Cinternal%3E.UsersFacade#getuserrolesforsite)
- [getUserRolesForTenant](../wiki/index.%3Cinternal%3E.UsersFacade#getuserrolesfortenant)
- [getUsers](../wiki/index.%3Cinternal%3E.UsersFacade#getusers)
- [getUsersBySite](../wiki/index.%3Cinternal%3E.UsersFacade#getusersbysite)
- [updateUserRolesForSite](../wiki/index.%3Cinternal%3E.UsersFacade#updateuserrolesforsite)
- [updateUserRolesForTenant](../wiki/index.%3Cinternal%3E.UsersFacade#updateuserrolesfortenant)

## Constructors

### constructor

• **new UsersFacade**(`store`, `mySecurityRightsStore`, `service`, `query`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`UsersStore`](../wiki/index.%3Cinternal%3E.UsersStore) |
| `mySecurityRightsStore` | [`MySecurityRightsStore`](../wiki/index.%3Cinternal%3E.MySecurityRightsStore) |
| `service` | [`UsersApiService`](../wiki/index.%3Cinternal%3E.UsersApiService) |
| `query` | [`UsersQuery`](../wiki/index.%3Cinternal%3E.UsersQuery) |

#### Overrides

BaseEntityFacade&lt;UsersStore, UsersApiService, UsersQuery\&gt;.constructor

#### Defined in

public/lib/store/users/users.facade.ts:25

## Properties

### isAddingUserToSite$

• `Readonly` **isAddingUserToSite$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/users/users.facade.ts:42

___

### isFetchingUserRolesForTenant$

• `Readonly` **isFetchingUserRolesForTenant$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/users/users.facade.ts:41

___

### meta$

• `Readonly` **meta$**: `Observable`<`undefined` \| `Page`\>

#### Defined in

public/lib/store/users/users.facade.ts:34

___

### query

• `Protected` **query**: [`UsersQuery`](../wiki/index.%3Cinternal%3E.UsersQuery)

#### Inherited from

BaseEntityFacade.query

___

### service

• `Protected` **service**: [`UsersApiService`](../wiki/index.%3Cinternal%3E.UsersApiService)

#### Inherited from

BaseEntityFacade.service

___

### store

• `Protected` **store**: [`UsersStore`](../wiki/index.%3Cinternal%3E.UsersStore)

#### Inherited from

BaseEntityFacade.store

___

### user$

• `Readonly` **user$**: `Observable`<`undefined` \| [`UserDetailModel`](../wiki/index.%3Cinternal%3E.UserDetailModel)\>

#### Defined in

public/lib/store/users/users.facade.ts:36

___

### userRolesForSite$

• `Readonly` **userRolesForSite$**: `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/users/users.facade.ts:38

___

### userRolesForTenant$

• `Readonly` **userRolesForTenant$**: `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/users/users.facade.ts:37

___

### users$

• `Readonly` **users$**: `Observable`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)[]\>

#### Defined in

public/lib/store/users/users.facade.ts:35

## Methods

### addUserToSite

▸ **addUserToSite**(`payload`, `fn`): `void`

Create calls

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`AddUserToSitePayload`](../wiki/index.%3Cinternal%3E.AddUserToSitePayload) |
| `fn` | () => `void` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:241

___

### clearUser

▸ **clearUser**(): `void`

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:255

___

### getTenantUserBySite

▸ **getTenantUserBySite**(`payload`, `siteId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |
| `siteId` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:125

___

### getTenantUsersBySite

▸ **getTenantUsersBySite**(`payload`, `siteId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `SearchParams` |
| `siteId` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:88

___

### getUser

▸ **getUser**(`payload`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:109

___

### getUserRolesForSite

▸ **getUserRolesForSite**(`payload`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`GetUserRolesForSitePayload`](../wiki/index.%3Cinternal%3E.GetUserRolesForSitePayload) |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:155

___

### getUserRolesForTenant

▸ **getUserRolesForTenant**(`payload`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:140

___

### getUsers

▸ **getUsers**(`payload`): `void`

Get calls

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `SearchParams` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:48

___

### getUsersBySite

▸ **getUsersBySite**(`payload`, `siteId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `SearchParams` |
| `siteId` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/users/users.facade.ts:68

___

### updateUserRolesForSite

▸ **updateUserRolesForSite**(`payload`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`UpdateUserRolesForSitePayload`](../wiki/index.%3Cinternal%3E.UpdateUserRolesForSitePayload) |
| `options` | [`AlertOptions`](../wiki/index.%3Cinternal%3E.AlertOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/users/users.facade.ts:207

___

### updateUserRolesForTenant

▸ **updateUserRolesForTenant**(`payload`): `Promise`<`void`\>

Update calls

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`UpdateUserRolesForTenantPayload`](../wiki/index.%3Cinternal%3E.UpdateUserRolesForTenantPayload) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/users/users.facade.ts:172
