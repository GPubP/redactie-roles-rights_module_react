# Namespace: <internal\>

[index](../wiki/index).<internal>

## Table of contents

### Enumerations

- [ALERT\_CONTAINER\_IDS](../wiki/index.%3Cinternal%3E.ALERT_CONTAINER_IDS)
- [RoleEntityTypes](../wiki/index.%3Cinternal%3E.RoleEntityTypes)
- [RolesRightsCompartmentType](../wiki/index.%3Cinternal%3E.RolesRightsCompartmentType)

### Classes

- [MySecurityRightsFacade](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade)
- [MySecurityRightsQuery](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery)
- [MySecurityRightsStore](../wiki/index.%3Cinternal%3E.MySecurityRightsStore)
- [RolesApiService](../wiki/index.%3Cinternal%3E.RolesApiService)
- [RolesFacade](../wiki/index.%3Cinternal%3E.RolesFacade)
- [RolesQuery](../wiki/index.%3Cinternal%3E.RolesQuery)
- [RolesStore](../wiki/index.%3Cinternal%3E.RolesStore)
- [SecurityRightsApiService](../wiki/index.%3Cinternal%3E.SecurityRightsApiService)
- [SecurityRightsMatrixFacade](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade)
- [SecurityRightsMatrixQuery](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery)
- [SecurityRightsMatrixStore](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixStore)
- [UsersApiService](../wiki/index.%3Cinternal%3E.UsersApiService)
- [UsersFacade](../wiki/index.%3Cinternal%3E.UsersFacade)
- [UsersQuery](../wiki/index.%3Cinternal%3E.UsersQuery)
- [UsersStore](../wiki/index.%3Cinternal%3E.UsersStore)

### Interfaces

- [AddUserToSitePayload](../wiki/index.%3Cinternal%3E.AddUserToSitePayload)
- [AlertOptions](../wiki/index.%3Cinternal%3E.AlertOptions)
- [GetUserRolesForSitePayload](../wiki/index.%3Cinternal%3E.GetUserRolesForSitePayload)
- [ModuleResponse](../wiki/index.%3Cinternal%3E.ModuleResponse)
- [Role](../wiki/index.%3Cinternal%3E.Role)
- [RoleAttributes](../wiki/index.%3Cinternal%3E.RoleAttributes)
- [RoleAttributes](../wiki/index.%3Cinternal%3E.RoleAttributes)
- [RoleEntityState](../wiki/index.%3Cinternal%3E.RoleEntityState)
- [RoleMapResponse](../wiki/index.%3Cinternal%3E.RoleMapResponse)
- [RolePayload](../wiki/index.%3Cinternal%3E.RolePayload)
- [RolePayloadBody](../wiki/index.%3Cinternal%3E.RolePayloadBody)
- [RoleResponse](../wiki/index.%3Cinternal%3E.RoleResponse)
- [RoleResponse](../wiki/index.%3Cinternal%3E.RoleResponse)
- [SearchUserRolesForSitePayload](../wiki/index.%3Cinternal%3E.SearchUserRolesForSitePayload)
- [SecurableRenderProps](../wiki/index.%3Cinternal%3E.SecurableRenderProps)
- [SecurityRightAttributes](../wiki/index.%3Cinternal%3E.SecurityRightAttributes)
- [SecurityRightMatrixResponse](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)
- [SecurityRightResponse](../wiki/index.%3Cinternal%3E.SecurityRightResponse)
- [SelectedCompartment](../wiki/index.%3Cinternal%3E.SelectedCompartment)
- [SiteRightsCache](../wiki/index.%3Cinternal%3E.SiteRightsCache)
- [UpdateRolesMatrix](../wiki/index.%3Cinternal%3E.UpdateRolesMatrix)
- [UpdateUserRolesForSitePayload](../wiki/index.%3Cinternal%3E.UpdateUserRolesForSitePayload)
- [UpdateUserRolesForTenantPayload](../wiki/index.%3Cinternal%3E.UpdateUserRolesForTenantPayload)
- [UseMySecurityRightsForSiteFunction](../wiki/index.%3Cinternal%3E.UseMySecurityRightsForSiteFunction)
- [UseMySecurityRightsForTenantFunction](../wiki/index.%3Cinternal%3E.UseMySecurityRightsForTenantFunction)
- [UserDetailModel](../wiki/index.%3Cinternal%3E.UserDetailModel)
- [UserResponse](../wiki/index.%3Cinternal%3E.UserResponse)
- [UsersBasePayload](../wiki/index.%3Cinternal%3E.UsersBasePayload)

### Type aliases

- [CheckSecurityRightsFunction](../wiki/index.%3Cinternal%3E#checksecurityrightsfunction)
- [RoleMapsResponses](../wiki/index.%3Cinternal%3E#rolemapsresponses)
- [RolesResponse](../wiki/index.%3Cinternal%3E#rolesresponse)
- [UpdateRolesMatrixPayload](../wiki/index.%3Cinternal%3E#updaterolesmatrixpayload)
- [UseSiteRolesFunction](../wiki/index.%3Cinternal%3E#usesiterolesfunction)
- [UseSiteRolesFunctionReturnType](../wiki/index.%3Cinternal%3E#usesiterolesfunctionreturntype)
- [UseUserRolesForSiteFunction](../wiki/index.%3Cinternal%3E#useuserrolesforsitefunction)
- [UseUserRolesForSiteFunctionReturnType](../wiki/index.%3Cinternal%3E#useuserrolesforsitefunctionreturntype)
- [UseUsersFunction](../wiki/index.%3Cinternal%3E#useusersfunction)
- [UseUsersFunctionReturnType](../wiki/index.%3Cinternal%3E#useusersfunctionreturntype)
- [UsersResponse](../wiki/index.%3Cinternal%3E#usersresponse)

## Type aliases

### CheckSecurityRightsFunction

Ƭ **CheckSecurityRightsFunction**: (`userSecurityRights`: `string`[], `requiredSecurityRights`: `string`[], `oneSecurityRight?`: `boolean`) => `boolean`

#### Type declaration

▸ (`userSecurityRights`, `requiredSecurityRights`, `oneSecurityRight?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `userSecurityRights` | `string`[] |
| `requiredSecurityRights` | `string`[] |
| `oneSecurityRight?` | `boolean` |

##### Returns

`boolean`

#### Defined in

public/lib/helpers/checkSecurityRights/checkSecurityRights.types.ts:1

___

### RoleMapsResponses

Ƭ **RoleMapsResponses**: `EmbeddedResponse`<[`RoleMapResponse`](../wiki/index.%3Cinternal%3E.RoleMapResponse)\>

#### Defined in

public/lib/services/roles/roles.service.types.ts:37

___

### RolesResponse

Ƭ **RolesResponse**: `EmbeddedResponse`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/services/roles/roles.service.types.ts:25

___

### UpdateRolesMatrixPayload

Ƭ **UpdateRolesMatrixPayload**: [`UpdateRolesMatrix`](../wiki/index.%3Cinternal%3E.UpdateRolesMatrix)[]

#### Defined in

public/lib/services/securityRights/securityRights.service.types.ts:71

___

### UseSiteRolesFunction

Ƭ **UseSiteRolesFunction**: () => [`UseSiteRolesFunctionReturnType`](../wiki/index.%3Cinternal%3E#usesiterolesfunctionreturntype)

#### Type declaration

▸ (): [`UseSiteRolesFunctionReturnType`](../wiki/index.%3Cinternal%3E#usesiterolesfunctionreturntype)

##### Returns

[`UseSiteRolesFunctionReturnType`](../wiki/index.%3Cinternal%3E#usesiterolesfunctionreturntype)

#### Defined in

public/lib/hooks/useSiteRoles/useSiteRoles.types.ts:7

___

### UseSiteRolesFunctionReturnType

Ƭ **UseSiteRolesFunctionReturnType**: [`LoadingState` \| ``null``, [`RoleModel`](../wiki/index#rolemodel)[] \| ``null`` \| `undefined`]

#### Defined in

public/lib/hooks/useSiteRoles/useSiteRoles.types.ts:5

___

### UseUserRolesForSiteFunction

Ƭ **UseUserRolesForSiteFunction**: () => [`UseUserRolesForSiteFunctionReturnType`](../wiki/index.%3Cinternal%3E#useuserrolesforsitefunctionreturntype)

#### Type declaration

▸ (): [`UseUserRolesForSiteFunctionReturnType`](../wiki/index.%3Cinternal%3E#useuserrolesforsitefunctionreturntype)

##### Returns

[`UseUserRolesForSiteFunctionReturnType`](../wiki/index.%3Cinternal%3E#useuserrolesforsitefunctionreturntype)

#### Defined in

public/lib/hooks/useUserRolesForSite/useUserRolesForSite.types.ts:10

___

### UseUserRolesForSiteFunctionReturnType

Ƭ **UseUserRolesForSiteFunctionReturnType**: [`LoadingState` \| ``null``, [`RoleModel`](../wiki/index#rolemodel)[] \| ``null`` \| `undefined`]

#### Defined in

public/lib/hooks/useUserRolesForSite/useUserRolesForSite.types.ts:5

___

### UseUsersFunction

Ƭ **UseUsersFunction**: () => [`UseUsersFunctionReturnType`](../wiki/index.%3Cinternal%3E#useusersfunctionreturntype)

#### Type declaration

▸ (): [`UseUsersFunctionReturnType`](../wiki/index.%3Cinternal%3E#useusersfunctionreturntype)

##### Returns

[`UseUsersFunctionReturnType`](../wiki/index.%3Cinternal%3E#useusersfunctionreturntype)

#### Defined in

public/lib/hooks/useUsers/useUsers.types.ts:11

___

### UseUsersFunctionReturnType

Ƭ **UseUsersFunctionReturnType**: [`LoadingState` \| ``null``, [`UserModel`](../wiki/index#usermodel)[], [`UsersMetaModel`](../wiki/index#usersmetamodel) \| ``null`` \| `undefined`]

#### Defined in

public/lib/hooks/useUsers/useUsers.types.ts:5

___

### UsersResponse

Ƭ **UsersResponse**: `EmbeddedResponse`<[`UserResponse`](../wiki/index.%3Cinternal%3E.UserResponse)\>

#### Defined in

public/lib/services/users/users.service.types.ts:3
