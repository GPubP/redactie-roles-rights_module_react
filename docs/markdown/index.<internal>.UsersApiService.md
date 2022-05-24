# Class: UsersApiService

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).UsersApiService

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.UsersApiService#constructor)

### Methods

- [addUserToSite](../wiki/index.%3Cinternal%3E.UsersApiService#addusertosite)
- [getTenantUserBySite](../wiki/index.%3Cinternal%3E.UsersApiService#gettenantuserbysite)
- [getTenantUsersBySite](../wiki/index.%3Cinternal%3E.UsersApiService#gettenantusersbysite)
- [getUser](../wiki/index.%3Cinternal%3E.UsersApiService#getuser)
- [getUserRolesForSite](../wiki/index.%3Cinternal%3E.UsersApiService#getuserrolesforsite)
- [getUserRolesForTenant](../wiki/index.%3Cinternal%3E.UsersApiService#getuserrolesfortenant)
- [getUserSecurityRightsForSite](../wiki/index.%3Cinternal%3E.UsersApiService#getusersecurityrightsforsite)
- [getUserSecurityRightsForTenant](../wiki/index.%3Cinternal%3E.UsersApiService#getusersecurityrightsfortenant)
- [getUsers](../wiki/index.%3Cinternal%3E.UsersApiService#getusers)
- [getUsersBySite](../wiki/index.%3Cinternal%3E.UsersApiService#getusersbysite)
- [searchUserRolesForSite](../wiki/index.%3Cinternal%3E.UsersApiService#searchuserrolesforsite)
- [updateUserRolesForSite](../wiki/index.%3Cinternal%3E.UsersApiService#updateuserrolesforsite)
- [updateUserRolesForTenant](../wiki/index.%3Cinternal%3E.UsersApiService#updateuserrolesfortenant)

## Constructors

### constructor

• **new UsersApiService**()

## Methods

### addUserToSite

▸ **addUserToSite**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AddUserToSitePayload`](../wiki/index.%3Cinternal%3E.AddUserToSitePayload) |

#### Returns

`Promise`<`any`\>

#### Defined in

public/lib/services/users/users.service.ts:120

___

### getTenantUserBySite

▸ **getTenantUserBySite**(`__namedParameters`, `siteId`): `Promise`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |
| `siteId` | `string` |

#### Returns

`Promise`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)\>

#### Defined in

public/lib/services/users/users.service.ts:59

___

### getTenantUsersBySite

▸ **getTenantUsersBySite**(`searchParams?`, `siteId`): `Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_USERS_SEARCH_PARAMS` |
| `siteId` | `string` | `undefined` |

#### Returns

`Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:44

___

### getUser

▸ **getUser**(`__namedParameters`): `Promise`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |

#### Returns

`Promise`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)\>

#### Defined in

public/lib/services/users/users.service.ts:55

___

### getUserRolesForSite

▸ **getUserRolesForSite**(`__namedParameters`): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`GetUserRolesForSitePayload`](../wiki/index.%3Cinternal%3E.GetUserRolesForSitePayload) |

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:85

___

### getUserRolesForTenant

▸ **getUserRolesForTenant**(`__namedParameters`): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:66

___

### getUserSecurityRightsForSite

▸ **getUserSecurityRightsForSite**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AddUserToSitePayload`](../wiki/index.%3Cinternal%3E.AddUserToSitePayload) |

#### Returns

`Promise`<`any`\>

#### Defined in

public/lib/services/users/users.service.ts:136

___

### getUserSecurityRightsForTenant

▸ **getUserSecurityRightsForTenant**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UsersBasePayload`](../wiki/index.%3Cinternal%3E.UsersBasePayload) |

#### Returns

`Promise`<`any`\>

#### Defined in

public/lib/services/users/users.service.ts:130

___

### getUsers

▸ **getUsers**(`searchParams?`): `Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_USERS_SEARCH_PARAMS` |

#### Returns

`Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:23

___

### getUsersBySite

▸ **getUsersBySite**(`searchParams?`, `siteId`): `Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_USERS_SEARCH_PARAMS` |
| `siteId` | `string` | `undefined` |

#### Returns

`Promise`<[`UsersResponse`](../wiki/index.%3Cinternal%3E#usersresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:33

___

### searchUserRolesForSite

▸ **searchUserRolesForSite**(`__namedParameters`): `Promise`<[`RoleMapsResponses`](../wiki/index.%3Cinternal%3E#rolemapsresponses)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SearchUserRolesForSitePayload`](../wiki/index.%3Cinternal%3E.SearchUserRolesForSitePayload) |

#### Returns

`Promise`<[`RoleMapsResponses`](../wiki/index.%3Cinternal%3E#rolemapsresponses)\>

#### Defined in

public/lib/services/users/users.service.ts:92

___

### updateUserRolesForSite

▸ **updateUserRolesForSite**(`__namedParameters`): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UpdateUserRolesForSitePayload`](../wiki/index.%3Cinternal%3E.UpdateUserRolesForSitePayload) |

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:106

___

### updateUserRolesForTenant

▸ **updateUserRolesForTenant**(`__namedParameters`): `Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UpdateUserRolesForTenantPayload`](../wiki/index.%3Cinternal%3E.UpdateUserRolesForTenantPayload) |

#### Returns

`Promise`<[`RolesResponse`](../wiki/index.%3Cinternal%3E#rolesresponse)\>

#### Defined in

public/lib/services/users/users.service.ts:72
