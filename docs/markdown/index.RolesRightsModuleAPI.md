# Interface: RolesRightsModuleAPI

[index](../wiki/index).RolesRightsModuleAPI

## Table of contents

### Properties

- [canShowns](../wiki/index.RolesRightsModuleAPI#canshowns)
- [components](../wiki/index.RolesRightsModuleAPI#components)
- [consts](../wiki/index.RolesRightsModuleAPI#consts)
- [guards](../wiki/index.RolesRightsModuleAPI#guards)
- [helpers](../wiki/index.RolesRightsModuleAPI#helpers)
- [hooks](../wiki/index.RolesRightsModuleAPI#hooks)
- [store](../wiki/index.RolesRightsModuleAPI#store)
- [views](../wiki/index.RolesRightsModuleAPI#views)

## Properties

### canShowns

• **canShowns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `securityRightsSiteCanShown` | `SecurityRightsSiteCanShownFunction` |
| `securityRightsTenantCanShown` | [`SecurityRightsTenantCanShownFunction`](../wiki/index#securityrightstenantcanshownfunction) |

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
| `securityRightsSiteGuard` | [`SecurityRightsSiteGuardFunction`](../wiki/index#securityrightssiteguardfunction) |
| `securityRightsTenantGuard` | [`SecurityRightsTenantGuardFunction`](../wiki/index#securityrightstenantguardfunction) |

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
