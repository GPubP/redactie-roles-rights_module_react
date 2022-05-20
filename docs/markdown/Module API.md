# Module: Module API

## Table of contents

### Variables

- [canShowns](../wiki/Module%20API#canshowns)
- [components](../wiki/Module%20API#components)
- [consts](../wiki/Module%20API#consts)
- [guards](../wiki/Module%20API#guards)
- [helpers](../wiki/Module%20API#helpers)
- [hooks](../wiki/Module%20API#hooks)
- [store](../wiki/Module%20API#store)
- [views](../wiki/Module%20API#views)

## Variables

### canShowns

• `Const` **canShowns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `securityRightsSiteCanShown` | `SecurityRightsSiteCanShownFunction` |
| `securityRightsTenantCanShown` | [`SecurityRightsTenantCanShownFunction`](../wiki/index#securityrightstenantcanshownfunction) |

#### Defined in

public/lib/api/canShowns.ts:3

___

### components

• `Const` **components**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SecurableRender` | `FC`<`SecurableRenderProps`\> |

#### Defined in

public/lib/api/components.ts:3

___

### consts

• `Const` **consts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `forbidden403Path` | `string` |

#### Defined in

public/lib/api/consts.ts:3

___

### guards

• `Const` **guards**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `securityRightsSiteGuard` | [`SecurityRightsSiteGuardFunction`](../wiki/index#securityrightssiteguardfunction) |
| `securityRightsTenantGuard` | [`SecurityRightsTenantGuardFunction`](../wiki/index#securityrightstenantguardfunction) |

#### Defined in

public/lib/api/guards.ts:3

___

### helpers

• `Const` **helpers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkSecurityRights` | `CheckSecurityRightsFunction` |

#### Defined in

public/lib/api/helpers.ts:3

___

### hooks

• `Const` **hooks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `useMySecurityRightsForSite` | (`options`: { `module?`: `string` ; `onlyKeys`: ``true`` ; `siteUuid`: `string`  }) => [`LoadingState` \| ``null``, `string`[]](`options`: { `module?`: `string` ; `onlyKeys`: ``false`` ; `siteUuid`: `string`  }) => [`LoadingState` \| ``null``, [`MySecurityRightModel`](../wiki/index#mysecurityrightmodel)[]](`options`: { `module?`: `string` ; `onlyKeys`: `boolean` ; `siteUuid`: `string`  }) => [`LoadingState` \| ``null``, [`MySecurityRightModel`](../wiki/index#mysecurityrightmodel)[] \| `string`[]] |
| `useMySecurityRightsForTenant` | (`onlyKeys`: ``true``) => [`LoadingState` \| ``null``, `string`[]](`onlyKeys`: ``false``) => [`LoadingState` \| ``null``, [`MySecurityRightModel`](../wiki/index#mysecurityrightmodel)[]](`onlyKeys`: `boolean`) => [`LoadingState` \| ``null``, [`MySecurityRightModel`](../wiki/index#mysecurityrightmodel)[] \| `string`[]] |
| `useSiteRoles` | () => [``null`` \| `LoadingState`, `undefined` \| ``null`` \| `RoleResponse`[]] |
| `useUserRolesForSite` | () => [``null`` \| `LoadingState`, `undefined` \| ``null`` \| `RoleResponse`[]] |
| `useUsers` | () => `UseUsersFunctionReturnType` |

#### Defined in

public/lib/api/hooks.ts:9

___

### store

• `Const` **store**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mySecurityRights` | { `query`: `MySecurityRightsQuery` = mySecurityRightsQuery; `service`: { `getMySecurityRights`: (`siteUuid?`: `string`, `clearCache`: `boolean`) => `void` ; `getMySiteSecurityRights`: (`siteUuid`: `string`, `clearCache`: `boolean`) => `Promise`<`void`\> ; `getMyTenantSecurityRights`: (`clearCache`: `boolean`) => `Promise`<`void`\>  }  } |
| `mySecurityRights.query` | `MySecurityRightsQuery` |
| `mySecurityRights.service` | { `getMySecurityRights`: (`siteUuid?`: `string`, `clearCache`: `boolean`) => `void` ; `getMySiteSecurityRights`: (`siteUuid`: `string`, `clearCache`: `boolean`) => `Promise`<`void`\> ; `getMyTenantSecurityRights`: (`clearCache`: `boolean`) => `Promise`<`void`\>  } |
| `mySecurityRights.service.getMySecurityRights` | (`siteUuid?`: `string`, `clearCache`: `boolean`) => `void` |
| `mySecurityRights.service.getMySiteSecurityRights` | (`siteUuid`: `string`, `clearCache`: `boolean`) => `Promise`<`void`\> |
| `mySecurityRights.service.getMyTenantSecurityRights` | (`clearCache`: `boolean`) => `Promise`<`void`\> |
| `roles` | { `query`: `RolesQuery` = rolesQuery; `service`: { `getDefaultSiteRoles`: () => `void` ; `getSiteRoles`: (`siteUuid`: `string`, `payload`: `SearchParams`) => `void` ; `getTenantRoles`: () => `void`  }  } |
| `roles.query` | `RolesQuery` |
| `roles.service` | { `getDefaultSiteRoles`: () => `void` ; `getSiteRoles`: (`siteUuid`: `string`, `payload`: `SearchParams`) => `void` ; `getTenantRoles`: () => `void`  } |
| `roles.service.getDefaultSiteRoles` | () => `void` |
| `roles.service.getSiteRoles` | (`siteUuid`: `string`, `payload`: `SearchParams`) => `void` |
| `roles.service.getTenantRoles` | () => `void` |
| `securityRights` | { `query`: `SecurityRightsMatrixQuery` = securityRightsMatrixQuery; `service`: { `getSecurityRightsBySite`: (`payload`: `SearchParams`, `siteId`: `string`) => `void`  }  } |
| `securityRights.query` | `SecurityRightsMatrixQuery` |
| `securityRights.service` | { `getSecurityRightsBySite`: (`payload`: `SearchParams`, `siteId`: `string`) => `void`  } |
| `securityRights.service.getSecurityRightsBySite` | (`payload`: `SearchParams`, `siteId`: `string`) => `void` |
| `users` | { `query`: `UsersQuery` = usersQuery; `service`: { `getUser`: (`payload`: `UsersBasePayload`) => `void` ; `getUserRolesForSite`: (`payload`: `GetUserRolesForSitePayload`) => `void` ; `getUsers`: (`payload`: `SearchParams`) => `void` ; `getUsersBySite`: (`payload`: `SearchParams`, `siteId`: `string`) => `void`  }  } |
| `users.query` | `UsersQuery` |
| `users.service` | { `getUser`: (`payload`: `UsersBasePayload`) => `void` ; `getUserRolesForSite`: (`payload`: `GetUserRolesForSitePayload`) => `void` ; `getUsers`: (`payload`: `SearchParams`) => `void` ; `getUsersBySite`: (`payload`: `SearchParams`, `siteId`: `string`) => `void`  } |
| `users.service.getUser` | (`payload`: `UsersBasePayload`) => `void` |
| `users.service.getUserRolesForSite` | (`payload`: `GetUserRolesForSitePayload`) => `void` |
| `users.service.getUsers` | (`payload`: `SearchParams`) => `void` |
| `users.service.getUsersBySite` | (`payload`: `SearchParams`, `siteId`: `string`) => `void` |

#### Defined in

public/lib/api/store.ts:9

___

### views

• `Const` **views**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Forbidden403View` | `FC`<{}\> |

#### Defined in

public/lib/api/views.ts:3
