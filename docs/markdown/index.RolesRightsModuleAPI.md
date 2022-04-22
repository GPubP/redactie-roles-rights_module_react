# Interface: RolesRightsModuleAPI

[index](../wiki/index).RolesRightsModuleAPI

## Table of contents

### Properties

- [canShowns](../wiki/index.RolesRightsModuleAPI#canshowns-1)
- [components](../wiki/index.RolesRightsModuleAPI#components-1)
- [consts](../wiki/index.RolesRightsModuleAPI#consts-1)
- [guards](../wiki/index.RolesRightsModuleAPI#guards-1)
- [helpers](../wiki/index.RolesRightsModuleAPI#helpers-1)
- [hooks](../wiki/index.RolesRightsModuleAPI#hooks-1)
- [store](../wiki/index.RolesRightsModuleAPI#store-1)
- [views](../wiki/index.RolesRightsModuleAPI#views-1)

## Properties

### canShowns

• **canShowns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `securityRightsSiteCanShown` | `SecurityRightsSiteCanShownFunction` |
| `securityRightsTenantCanShown` | [`SecurityRightsTenantCanShownFunction`](../wiki/index#securityrightstenantcanshownfunction-1) |

#### Defined in

public/lib/roles.types.ts:91

___

### components

• **components**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SecurableRender` | `FC`<`SecurableRenderProps`\> |

#### Defined in

public/lib/roles.types.ts:84

___

### consts

• **consts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `forbidden403Path` | `string` |

#### Defined in

public/lib/roles.types.ts:50

___

### guards

• **guards**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `securityRightsSiteGuard` | [`SecurityRightsSiteGuardFunction`](../wiki/index#securityrightssiteguardfunction-1) |
| `securityRightsTenantGuard` | [`SecurityRightsTenantGuardFunction`](../wiki/index#securityrightstenantguardfunction-1) |

#### Defined in

public/lib/roles.types.ts:87

___

### helpers

• **helpers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkSecurityRights` | `CheckSecurityRightsFunction` |

#### Defined in

public/lib/roles.types.ts:95

___

### hooks

• **hooks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `useMySecurityRightsForSite` | `UseMySecurityRightsForSiteFunction` |
| `useMySecurityRightsForTenant` | `UseMySecurityRightsForTenantFunction` |
| `useSiteRoles` | `UseSiteRolesFunction` |
| `useUserRolesForSite` | `UseUserRolesForSiteFunction` |
| `useUsers` | `UseUsersFunction` |

#### Defined in

public/lib/roles.types.ts:77

___

### store

• **store**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mySecurityRights` | { `query`: `MySecurityRightsQuery` ; `service`: `Pick`<`MySecurityRightsFacade`, ``"getMyTenantSecurityRights"`` \| ``"getMySiteSecurityRights"`` \| ``"getMySecurityRights"``\>  } |
| `mySecurityRights.query` | `MySecurityRightsQuery` |
| `mySecurityRights.service` | `Pick`<`MySecurityRightsFacade`, ``"getMyTenantSecurityRights"`` \| ``"getMySiteSecurityRights"`` \| ``"getMySecurityRights"``\> |
| `roles` | { `query`: `RolesQuery` ; `service`: `Pick`<`RolesFacade`, ``"getSiteRoles"`` \| ``"getTenantRoles"`` \| ``"getDefaultSiteRoles"``\>  } |
| `roles.query` | `RolesQuery` |
| `roles.service` | `Pick`<`RolesFacade`, ``"getSiteRoles"`` \| ``"getTenantRoles"`` \| ``"getDefaultSiteRoles"``\> |
| `securityRights` | { `query`: `SecurityRightsMatrixQuery` ; `service`: `Pick`<`SecurityRightsMatrixFacade`, ``"getSecurityRightsBySite"``\>  } |
| `securityRights.query` | `SecurityRightsMatrixQuery` |
| `securityRights.service` | `Pick`<`SecurityRightsMatrixFacade`, ``"getSecurityRightsBySite"``\> |
| `users` | { `query`: `UsersQuery` ; `service`: `Pick`<`UsersFacade`, ``"getUsersBySite"`` \| ``"getUsers"`` \| ``"getUser"`` \| ``"getUserRolesForSite"``\>  } |
| `users.query` | `UsersQuery` |
| `users.service` | `Pick`<`UsersFacade`, ``"getUsersBySite"`` \| ``"getUsers"`` \| ``"getUser"`` \| ``"getUserRolesForSite"``\> |

#### Defined in

public/lib/roles.types.ts:53

___

### views

• **views**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Forbidden403View` | `FC`<{}\> |

#### Defined in

public/lib/roles.types.ts:98
